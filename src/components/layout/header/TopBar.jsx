import React from 'react'
import { Link } from 'react-router-dom'


const TopBar = () => {
  return (
    <div className='bg-[#0a1a3c] text-white text-lg'>
      <div className='flex items-center justify-center gap-10 py-6 px-6 flex-wrap'>
        <span className='italic font-serif'>August Style Event</span>
        <span>Extra 30% Off $175+ | 20% Off $125+</span>
        <Link to="/men" className="underline font-medium">Shop Men</Link>
        <Link to="/women" className="underline font-medium">Shop Women</Link>
        <Link to="/kids" className="underline font-medium">Shop Kids</Link>
      </div>
    </div>
  )
}

export default TopBar