import React from 'react'
import { Link } from 'react-router-dom'

const colsMap = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

const CategoryGrid = ({ tiles = [], columns = 4 }) => {
  return (
    <div className={`grid grid-cols-2 ${colsMap[columns] || colsMap[4]} gap-6 md:gap-8`}>
      {tiles.map((tile) =>
        tile.ctas ? (
          <div key={tile.title} className="text-center">
            <Link to={tile.ctas[0].to} className="block overflow-hidden group">
              <img
                src={tile.image}
                alt={tile.title}
                className="w-full aspect-3/4 object-cover group-hover:scale-105 transition duration-500"
              />
            </Link>
            <h3 className="text-lg font-light mt-4 mb-1">{tile.title}</h3>
            <div className="flex items-center justify-center gap-3 text-sm underline">
              {tile.ctas.map((cta) => (
                <Link key={cta.label} to={cta.to} className="hover:text-gray-600">
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link key={tile.title} to={tile.to} className="relative block group overflow-hidden">
            <img
              src={tile.image}
              alt={tile.title}
              className="w-full aspect-3/4 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 text-white bg-linear-to-t from-black/40 to-transparent">
              <h3 className="text-xl font-light mb-1">{tile.title}</h3>
              {tile.ctaLabel && <span className="text-xs underline">{tile.ctaLabel}</span>}
            </div>
          </Link>
        )
      )}
    </div>
  )
}

export default CategoryGrid
