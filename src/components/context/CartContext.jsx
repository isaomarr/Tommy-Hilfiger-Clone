import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const CART_KEY = 'th_cart_items'

const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || []
  } catch {
    return []
  }
}

const buildKey = (productId, size, color) => `${productId}::${size}::${color}`

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readCart)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addItem = ({ product, size, color, qty = 1 }) => {
    const key = buildKey(product.id, size, color)

    setItems((prev) => {
      const existing = prev.find((item) => item.key === key)

      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, qty: Math.min(item.qty + qty, product.stock) }
            : item
        )
      }

      const colorObj = product.colors.find((c) => c.name === color)

      return [
        ...prev,
        {
          key,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: colorObj?.image || product.images[0],
          price: product.price,
          size,
          color,
          colorHex: colorObj?.hex,
          qty: Math.min(qty, product.stock),
        },
      ]
    })
  }

  const updateQty = (key, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((item) => item.key !== key)
      return prev.map((item) => (item.key === key ? { ...item, qty } : item))
    })
  }

  const removeItem = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key))
  }

  const clear = () => setItems([])

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQty,
        removeItem,
        clear,
        itemCount,
        subtotal,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
