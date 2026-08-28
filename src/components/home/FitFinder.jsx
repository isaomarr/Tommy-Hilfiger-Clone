import React from 'react'
import fittImg from '../../assets/images/04_HP_Tile02_dt.jpg'
import { Link } from 'react-router-dom'

const FitFinder = () => {
  return (
    <div className="relative w-full">
      <Link to="/men/jeans">
        <img src={fittImg} alt="Find Your Perfect Fit" className="w-full object-cover" />
      </Link>
      <div className="absolute bottom-4 sm:bottom-14 md:bottom-25 left-0 w-full px-4 flex flex-col items-center text-white pointer-events-none">
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-light mb-2 sm:mb-4 drop-shadow-md text-center">
          Find Your Perfect Fit
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pointer-events-auto w-full sm:w-auto">
          <Link
            to="/men"
            className="bg-white text-black px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base font-medium text-center whitespace-nowrap hover:bg-gray-100 transition"
          >
            Shop Men's Jeans
          </Link>
          <Link
            to="/women"
            className="bg-white text-black px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base font-medium text-center whitespace-nowrap hover:bg-gray-100 transition"
          >
            Shop Women's Jeans
          </Link>
          <Link
            to="/fit-guide"
            className="bg-white text-black px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base font-medium text-center whitespace-nowrap hover:bg-gray-100 transition"
          >
            Explore the Fit Guide +
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FitFinder