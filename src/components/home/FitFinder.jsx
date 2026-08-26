import React from 'react'
import fittImg from '../../assets/images/04_HP_Tile02_dt.jpg'
import { Link } from 'react-router-dom'

const FitFinder = () => {
  return (
    <div className="relative w-full">
      <Link to="/men/jeans">
        <img src={fittImg} alt="Find Your Perfect Fit" className="w-full object-cover" />
      </Link>
      <div className="absolute bottom-[100px] left-0 w-full flex flex-col items-center text-white pointer-events-none">
        <h2 className="text-6xl font-light mb-4 drop-shadow-md">Find Your Perfect Fit</h2>
        <div className="flex gap-4 pointer-events-auto">
          <Link to="/men" className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition">Shop Men's Jeans</Link>
          <Link to="/women" className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition">Shop Women's Jeans</Link>
          <Link to="/fit-guide" className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition">Explore the Fit Guide +</Link>
        </div>
      </div>
    </div>
  )
}

export default FitFinder