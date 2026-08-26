import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Dropdown = ({ trigger, children, align = 'left', className = '' }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>
      <div
        onClick={(e) => {
          if (e.target.closest('button, a')) setOpen(false)
        }}
        className={`absolute top-full mt-2 z-50 bg-white border shadow-lg origin-top transition-all duration-300 ease-in-out ${align === 'right' ? 'right-0' : 'left-0'} ${
          open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default Dropdown
