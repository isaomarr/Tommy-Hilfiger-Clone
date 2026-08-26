import React from 'react'
import { Link } from 'react-router-dom'
import menImg from '../../assets/images/04_hp_tile5b_new_desktop.webp'
import womenImg from '../../assets/images/04_HP_Tile06_dt.jpg'

const panels = [
  { title: "Men's Edit", cta: "Shop Men's", to: '/men', image: menImg },
  { title: "Women's Edit", cta: "Shop Women's", to: '/women', image: womenImg },
]

const ShopMenWomen = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 px-4 md:px-8 py-4">
      {panels.map((panel) => (
        <Link key={panel.title} to={panel.to} className="relative block group overflow-hidden">
          <img
            src={panel.image}
            alt={panel.title}
            className="w-full aspect-square md:aspect-4/5 object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute bottom-8 left-0 w-full flex flex-col items-center text-white">
            <h3 className="text-3xl font-light mb-3 drop-shadow-md">{panel.title}</h3>
            <span className="bg-white text-black px-6 py-3 text-sm font-medium">{panel.cta}</span>
          </div>
        </Link>
      ))}
    </section>
  )
}

export default ShopMenWomen
