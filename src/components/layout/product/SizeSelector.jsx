import React from 'react'

const SizeSelector = ({ sizes = [], selected, onChange, error }) => {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Size{selected ? `  ${selected}` : ''}</p>
      <div className="grid grid-cols-5 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`h-14 text-sm border ${selected === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'}`}
          >
            {size}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-[#c8102e] mt-2">{error}</p>}
    </div>
  )
}

export default SizeSelector
