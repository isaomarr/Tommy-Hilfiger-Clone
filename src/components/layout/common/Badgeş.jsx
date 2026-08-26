import React from 'react'

const toneClasses = {
  sale: 'bg-[#c8102e] text-white',
  new: 'bg-[#0a1a3c] text-white',
  bestseller: 'bg-black text-white',
  default: 'bg-gray-200 text-gray-800',
}

const Badge = ({ label, tone = 'default', className = '' }) => {
  return (
    <span
      className={`inline-block px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${toneClasses[tone] || toneClasses.default} ${className}`}
    >
      {label}
    </span>
  )
}

export default Badge
