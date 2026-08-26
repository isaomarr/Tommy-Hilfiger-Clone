import React, { useState } from 'react'
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

    return (
        <header
            className={`fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
                }`}>
            <TopBar />
            <div className='flex items-center justify-between px-4 md:px-8 py-5 border-b gap-4'>
                <button className='md:hidden' onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
                    <FiMenu />
                </button>
                <Link to="/">
                    <img src={logo} alt="Tommy Hilfiger" className='h-6' />
                </Link>
                <Navbar className="hidden md:flex" />
                <div className='flex items-center gap-5 text-xl'>
                    <SearchBar />
                    <AccountMenu />
                    <button onClick={openDrawer} aria-label="Cart" className='relative'>
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
