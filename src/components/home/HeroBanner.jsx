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
      <div className="absolute bottom-4 sm:bottom-10 md:bottom-16 left-0 px-4 sm:px-8 md:px-12 text-white max-w-xl pointer-events-none">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-light mb-1 sm:mb-2">{title}</h1>
        {eyebrow && <p className="italic text-sm sm:text-lg md:text-xl mb-2 sm:mb-4">{eyebrow}</p>}
        <p className="hidden sm:block text-sm md:text-lg mb-3 sm:mb-6">{description}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pointer-events-auto">
          {ctas.map((cta) => (
            <Link
              key={cta.label}
              to={cta.to}
              className="bg-white text-black px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base font-medium whitespace-nowrap"
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
