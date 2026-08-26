import React, { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white max-w-md w-full mx-4 p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-xl" aria-label="Close">
          <FiX />
        </button>
        {title && <h2 className="text-2xl font-light mb-6">{title}</h2>}
        {children}
      </div>
    </div>
  )
}

export default Modal
