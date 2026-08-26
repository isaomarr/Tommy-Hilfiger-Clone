export const getAllOrders = () => {
  try {
    return JSON.parse(localStorage.getItem('th_orders')) || []
  } catch {
    return []
  }
}

export const getOrdersForEmail = (email) => {
  const normalized = (email || '').trim().toLowerCase()
  return getAllOrders()
    .filter((o) => (o.shipping?.email || '').toLowerCase() === normalized)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}
