import React from 'react'
import { Link } from 'react-router-dom'


const TopBar = () => {
  return (
    <div className='bg-[#0a1a3c] text-white text-sm sm:text-base md:text-lg'>
      <div className='flex items-center justify-center gap-x-10 gap-y-2 py-7 px-4 flex-wrap text-center'>
        <span className='italic font-serif'>August Style Event</span>
        <span>Extra 30% Off $175+ | 20% Off $125+</span>
        <span className='hidden sm:flex items-center gap-x-4'>
          <Link to="/men" className="underline font-medium">Shop Men</Link>
          <Link to="/women" className="underline font-medium">Shop Women</Link>
          <Link to="/kids" className="underline font-medium">Shop Kids</Link>
        </span>
      </div>
    </div>
  )
}

export default TopBar
