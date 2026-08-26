import React from 'react'
import { FaInstagram, FaFacebookF, FaXTwitter, FaYoutube, FaTiktok } from 'react-icons/fa6'
import { footer as footerData } from '../../data/shopData'
import logo from '../../../assets/images/Logo.svg'

const socialIcons = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  x: FaXTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
}

const columnLabels = { Help: 'Help & Support', About: 'About Tommy Hilfiger' }

const Footer = () => {
  const columns = ['Help', 'About']

  return (
    <footer className="bg-white text-black border-t">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {columns.map((col) => (
          <div key={col}>
            <h3 className="font-medium mb-4">{columnLabels[col]}</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              {footerData[col].map((label) => (
                <li key={label} className="hover:text-black cursor-pointer">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="font-medium mb-4">Join Us</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">Newsletter Signup</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-4">Follow Us</h3>
          <div className="flex gap-4">
            {footerData.social.map((platform) => {
              const Icon = socialIcons[platform]
              if (!Icon) return null
              return (
                <span
                  key={platform}
                  className="w-8 h-8 flex items-center justify-center border border-black/20 rounded-full text-sm"
                >
                  <Icon />
                </span>
              )
            })}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t px-8 py-8 flex flex-col items-start gap-4 text-xs text-gray-500">
        <img src={logo} alt="Tommy Hilfiger" className="h-5" />
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {footerData.Legal.map((label, i) => (
            <span key={label} className="flex items-center gap-3">
              <span className="hover:text-black cursor-pointer">{label}</span>
              {i < footerData.Legal.length - 1 && <span className="text-gray-300">|</span>}
            </span>
          ))}
        </div>
        <p>© {new Date().getFullYear()} TH Clone — Educational project. Not affiliated with Tommy Hilfiger.</p>
      </div>
    </footer>
  )
}

export default Footer
