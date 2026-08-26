import React from 'react'
import CategoryGrid from './CategoryGrid'
import img1 from '../../assets/images/04_HP_ExpMore01_dt.webp'
import img2 from '../../assets/images/04_HP_ExpMore02_dt.webp'
import img3 from '../../assets/images/04_HP_ExpMore03_dt.webp'
import img4 from '../../assets/images/04_HP_ExpMore04__dt.webp'

const tiles = [
  {
    title: 'T-Shirts',
    image: img1,
    ctas: [
      { label: 'Shop Men', to: '/men/t-shirts' },
      { label: 'Shop Women', to: '/women/t-shirts' },
    ],
  },
  {
    title: 'Hoodies & Sweatshirts',
    image: img2,
    ctas: [
      { label: 'Shop Men', to: '/men/hoodies-sweatshirts' },
      { label: 'Shop Women', to: '/women/hoodies-sweatshirts' },
    ],
  },
  {
    title: 'Jackets & Coats',
    image: img3,
    ctas: [
      { label: 'Shop Men', to: '/men/jackets-coats' },
      { label: 'Shop Women', to: '/women/jackets-coats' },
    ],
  },
  {
    title: 'Shoes',
    image: img4,
    ctas: [
      { label: 'Shop Men', to: '/men/shoes' },
      { label: 'Shop Women', to: '/women/shoes' },
    ],
  },
]

const ShopByCategory = () => {
  return (
    <section className="px-4 md:px-8 py-12">
      <h2 className="text-3xl font-light text-center mb-8">Shop By Category</h2>
      <CategoryGrid tiles={tiles} columns={4} />
    </section>
  )
}

export default ShopByCategory
