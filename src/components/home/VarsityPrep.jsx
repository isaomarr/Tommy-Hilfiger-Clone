import React from 'react'
import { Link } from 'react-router-dom'
import varsityVideo from '../../assets/videos/20260812_HP_Tile09_Video_dt.mp4'

const VarsityPrep = () => {
  return (
    <section className="relative w-full">
      <Link to="/new-arrivals">
        <video src={varsityVideo} autoPlay muted loop playsInline className="w-full h-[70vh] object-cover" />
      </Link>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 bg-black/20 pointer-events-none">
        <h2 className="text-5xl font-light mb-4 drop-shadow-md">Varsity Prep</h2>
        <p className="text-lg mb-6 max-w-md drop-shadow-md">Classic collegiate style, ready for the season.</p>
        <Link to="/new-arrivals" className="bg-white text-black px-8 py-3 font-medium pointer-events-auto">
          Shop Now
        </Link>
      </div>
    </section>
  )
}

export default VarsityPrep
