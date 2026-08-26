import React from 'react'

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-4',
}

const Loader = ({ size = 'md', label }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className={`${sizeMap[size]} rounded-full border-gray-200 border-t-[#0a1a3c] animate-spin`} />
      {label && <p className="text-sm text-gray-500">{label}</p>}
    </div>
  )
}

export default Loader
