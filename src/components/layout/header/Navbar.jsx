import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { navigation, getSale } from '../../data/shopData'
import newImg from '../../../assets/images/04_HP_Tile07_dt.jpg'
import menImg from '../../../assets/images/04_hp_tile5b_new_desktop.webp'
import womenImg from '../../../assets/images/04_HP_Tile06_dt.jpg'
import kidsImg from '../../../assets/images/04_HP_ExpMore03_dt.webp'
import shoesImg from '../../../assets/images/04_HP_Tile05_dt.jpg'
import jeansImg from '../../../assets/images/04_HP_Hero_dt.jpg'

const getNavEntry = (slug) => navigation.find((n) => n.slug === slug)

const men = getNavEntry('men')
const women = getNavEntry('women')
const boys = getNavEntry('boys')
const girls = getNavEntry('girls')

const splitInHalf = (arr) => {
  const mid = Math.ceil(arr.length / 2)
  return [arr.slice(0, mid), arr.slice(mid)]
}

const toColumns = (base, subcats) =>
  splitInHalf(subcats).map((half, i) => ({
    title: i === 0 ? 'Shop by Category' : ' ',
    links: half.map((sub) => ({ label: sub.name, to: `/${base}/${sub.slug}` })),
  }))

const maxSaleDiscount = Math.max(...getSale().map((p) => p.discountPercent), 0)

const NAV_CONFIG = [
  {
    slug: 'new-arrivals',
    name: 'New',
    image: newImg,
    imageCta: 'Shop New Arrivals',
    columns: [
      {
        title: 'Shop New Arrivals',
        links: [
          { label: 'Men', to: '/men' },
          { label: 'Women', to: '/women' },
          { label: 'Kids', to: '/kids' },
        ],
      },
    ],
  },
  {
    slug: 'men',
    name: 'Men',
    image: menImg,
    imageCta: "Shop Men's Tops",
    columns: toColumns('men', men?.subcategories || []),
  },
  {
    slug: 'women',
    name: 'Women',
    image: womenImg,
    imageCta: "Shop Women's Tops",
    columns: toColumns('women', women?.subcategories || []),
  },
  {
    slug: 'kids',
    name: 'Kids',
    image: kidsImg,
    imageCta: 'Shop Kids',
    columns: [
      {
        title: 'Boys',
        links: (boys?.subcategories || []).map((sub) => ({ label: sub.name, to: `/boys/${sub.slug}` })),
      },
      {
        title: 'Girls',
        links: (girls?.subcategories || []).map((sub) => ({ label: sub.name, to: `/girls/${sub.slug}` })),
      },
    ],
  },
  {
    slug: 'shoes-accessories',
    name: 'Shoes & Accessories',
    image: shoesImg,
    imageCta: 'Shop Accessories',
    columns: [
      {
        title: 'Men',
        links: [
          { label: 'Shop All', to: '/shoes-accessories/men' },
          { label: 'Shoes', to: '/men/shoes' },
          { label: 'Accessories', to: '/men/accessories' },
        ],
      },
      {
        title: 'Women',
        links: [
          { label: 'Shop All', to: '/shoes-accessories/women' },
          { label: 'Shoes', to: '/women/shoes' },
          { label: 'Accessories', to: '/women/accessories' },
        ],
      },
      { title: 'Boys', links: [{ label: 'Shoes', to: '/boys/shoes' }] },
      { title: 'Girls', links: [{ label: 'Shoes', to: '/girls/shoes' }] },
    ],
  },
  {
    slug: 'tommy-jeans',
    name: 'Tommy Jeans',
    image: jeansImg,
    imageCta: 'Shop Tommy Jeans',
    columns: [
      { title: 'Men', links: [{ label: 'Shop All', to: '/tommy-jeans/men' }, { label: 'Jeans', to: '/men/jeans' }] },
      { title: 'Women', links: [{ label: 'Shop All', to: '/tommy-jeans/women' }, { label: 'Jeans', to: '/women/jeans' }] },
    ],
  },
  {
    slug: 'sale',
    name: 'Sale',
    promo: maxSaleDiscount ? `Up to ${maxSaleDiscount}% Off Sale Styles` : 'Shop Sale Styles',
    columns: [
      { title: "Men's Sale", links: [{ label: 'Shop All', to: '/sale/men' }] },
      { title: "Women's Sale", links: [{ label: 'Shop All', to: '/sale/women' }] },
      { title: "Kids' Sale", links: [{ label: 'Shop All', to: '/sale/kids' }] },
    ],
  },
]

const Navbar = ({ className = 'flex' }) => {
  const [openSlug, setOpenSlug] = useState(null)
  const closeTimer = useRef(null)
  const activeItem = NAV_CONFIG.find((item) => item.slug === openSlug)

  const openNow = (slug) => {
    clearTimeout(closeTimer.current)
    setOpenSlug(slug)
  }

  const closeSoon = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenSlug(null), 200)
  }

  return (
    <nav className={`${className} items-center gap-8`}>
      {NAV_CONFIG.map((item) => (
        <div key={item.slug} className="h-full flex items-center" onMouseEnter={() => openNow(item.slug)} onMouseLeave={closeSoon}>
          <Link
            to={`/${item.slug}`}
            className={`text-sm font-medium hover:text-black ${openSlug === item.slug ? 'text-black' : 'text-gray-700'}`}
          >
            {item.name}
          </Link>
        </div>
      ))}

      {activeItem && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 w-screen bg-white border-t shadow-lg z-40"
          onMouseEnter={() => openNow(openSlug)}
          onMouseLeave={closeSoon}
        >
          <div className="max-w-7xl mx-auto px-10 py-8 flex gap-14">
            {activeItem.image ? (
              <div className="w-52 shrink-0 text-center">
                <Link to={`/${activeItem.slug}`} onClick={() => setOpenSlug(null)} className="block overflow-hidden">
                  <img src={activeItem.image} alt={activeItem.name} className="w-full aspect-3/4 object-cover" />
                </Link>
                <Link to={`/${activeItem.slug}`} onClick={() => setOpenSlug(null)} className="text-sm underline">
                  {activeItem.imageCta}
                </Link>
              </div>
            ) : (
              <div className="w-52 shrink-0 border-2 border-black flex items-center justify-center text-center p-6 aspect-3/4">
                <p className="text-2xl font-medium leading-snug">{activeItem.promo}</p>
              </div>
            )}
            <div className="flex-1 flex gap-14 flex-wrap">
              {activeItem.columns.map((col, i) => (
                <div key={i}>
                  <h3 className="font-medium mb-3 whitespace-pre">{col.title}</h3>
                  <ul className="flex flex-col gap-2 text-sm text-gray-600">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.to} onClick={() => setOpenSlug(null)} className="hover:text-black hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
