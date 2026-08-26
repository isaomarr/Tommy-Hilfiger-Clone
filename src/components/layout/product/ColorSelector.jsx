import React from 'react'

const ColorSelector = ({ colors = [], selected, onChange }) => {
  if (colors.length <= 1) return null

  return (
    <div>
      <p className="text-sm font-medium mb-2">Color: {selected?.name}</p>
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => onChange(c)}
            title={c.name}
            className={`w-9 h-9 rounded-full border-2 ${selected?.name === c.name ? 'border-black' : 'border-transparent'}`}
          >
            <span
              className="block w-full h-full rounded-full border border-gray-300"
              style={{ backgroundColor: c.hex }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorSelector
