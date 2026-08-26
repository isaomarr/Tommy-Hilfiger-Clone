import React from 'react'

const ProductGallery = ({ images = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      {images.map((img, i) => (
        <div key={img} className="aspect-4/5 bg-gray-100 overflow-hidden">
          <img src={img} alt={`product ${i + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  )
}

export default ProductGallery
