import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiX } from 'react-icons/fi'
import { search, formatPrice, getBestsellers } from '../../data/shopData'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'

const TRENDING = [
  { label: "Men's Tops & Sweaters", to: '/men/sweaters' },
  { label: "Men's Jeans", to: '/men/jeans' },
  { label: "Women's Tops & Sweaters", to: '/women/knitwear' },
  { label: "Women's Dresses & Skirts", to: '/women/dresses' },
  { label: "Kids' Clothing", to: '/kids' },
]

const bestsellers = getBestsellers(2)

const SearchBar = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const ref = useRef(null)

  const results = query.trim() ? search(query).slice(0, 6) : []

  useLockBodyScroll(open)

  const close = () => {
    setOpen(false)
    setQuery('')
  }

  useEffect(() => {
    if (!open) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    close()
  }

  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)} aria-label="Search">
        {open ? <FiX /> : <FiSearch />}
      </button>

      {createPortal(
        <>
          <div
            className={`fixed inset-0 bg-black/40 z-45 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={close}
          />
          <div
            ref={ref}
            className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 shadow-lg flex flex-col transition-transform duration-500 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b pb-3 mb-8">
                <FiSearch className="text-xl text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Please enter a keyword"
                  className="flex-1 text-lg outline-none"
                />
                <button type="button" onClick={close} aria-label="Close search" className="shrink-0">
                  <FiX className="text-xl" />
                </button>
              </form>

              {query.trim() ? (
                results.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {results.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        onClick={close}
                        className="flex items-center gap-3 hover:bg-gray-50 p-1"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-14 h-16 object-cover" />
                        <div className="text-sm">
                          <p className="font-medium">{p.name}</p>
                          <p className="text-gray-500">{formatPrice(p.price)}</p>
                        </div>
                      </Link>
                    ))}
                    <button onClick={handleSubmit} className="text-sm underline text-left mt-2">
                      View all results for "{query}"
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No results for "{query}".</p>
                )
              ) : (
                <div className="flex flex-col gap-10">
                  <div>
                    <h3 className="font-medium mb-4">Trending Categories</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                      {TRENDING.map((item) => (
                        <li key={item.label}>
                          <Link to={item.to} onClick={close} className="hover:underline">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Featured Best Sellers</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {bestsellers.map((p) => (
                        <Link key={p.id} to={`/product/${p.slug}`} onClick={close} className="block">
                          <img src={p.images[0]} alt={p.name} className="w-full aspect-3/4 object-cover mb-2" />
                          <p className="text-sm line-clamp-1">{p.name}</p>
                          <p className="text-sm text-gray-500">{formatPrice(p.price)}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  )
}

export default SearchBar
