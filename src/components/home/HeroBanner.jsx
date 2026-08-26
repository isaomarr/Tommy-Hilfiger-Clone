import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../../assets/images/04_HP_Hero_dt.jpg'

const HeroBanner = ({
  image = heroImg,
  eyebrow = 'With Romeo Beckham',
  title = 'Always Denim',
  description = 'Fresh new arrivals. All the best fits.',
  ctas = [
    { label: "Men's New Arrivals", to: '/men' },
    { label: "Women's New Arrivals", to: '/women' },
  ],
}) => {
  const primaryTo = ctas[0]?.to || '/'

  return (
    <div className="relative w-full">
      <Link to={primaryTo}>
        <img src={image} alt={title} className="w-full object-cover" />
      </Link>
      <div className="absolute bottom-16 left-0 px-12 text-white max-w-xl pointer-events-none">
        <h1 className="text-6xl font-light mb-2">{title}</h1>
        {eyebrow && <p className="italic text-xl mb-4">{eyebrow}</p>}
        <p className="text-lg mb-6">{description}</p>
        <div className="flex gap-4 pointer-events-auto">
          {ctas.map((cta) => (
            <Link key={cta.label} to={cta.to} className="bg-white text-black px-6 py-3 font-medium">
              {cta.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
