import React, { useEffect, useRef, useState } from 'react'
import { FiMenu, FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import logo from '../../../assets/images/Logo.svg'
import TopBar from './TopBar'
import SearchBar from './SearchBar'
import AccountMenu from './AccountMenu'
import MobilMenu from '../mobilMenu/MobilMenu'
import useScrollDirection from '../../hooks/useScrollDirection'
import { useCart } from '../../context/CartContext'

const Header = () => {
    const showNavbar = useScrollDirection()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { itemCount, openDrawer } = useCart()
    const headerRef = useRef(null)

    useEffect(() => {
        const el = headerRef.current
        if (!el) return

        const updateHeight = () => {
            document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
        }

        updateHeight()
        const observer = new ResizeObserver(updateHeight)
        observer.observe(el)
        window.addEventListener('resize', updateHeight)

        return () => {
            observer.disconnect()
            window.removeEventListener('resize', updateHeight)
        }
    }, [])

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
                }`}>
            <TopBar />
            <div className='flex items-center justify-between px-4 md:px-8 py-4 border-b gap-4'>
                <div className='flex flex-1 lg:hidden'>
                    <button
                        className='flex items-center text-xl'
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <FiMenu />
                    </button>
                </div>

                <Link to="/" className='flex items-center shrink-0'>
                    <img src={logo} alt="Tommy Hilfiger" className='block h-5 sm:h-6 w-auto' />
                </Link>

                <Navbar className="hidden lg:flex" />

                <div className='flex flex-1 lg:flex-none items-center justify-end gap-4 sm:gap-5 text-xl'>
                    <SearchBar />
                    <AccountMenu />
                    <button onClick={openDrawer} aria-label="Cart" className='relative flex items-center'>
                        <FiShoppingBag />
                        {itemCount > 0 && (
                            <span className='absolute -top-2 -right-2 bg-[#c8102e] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center'>
                                {itemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
            <MobilMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </header>
    )
}

export default Header
