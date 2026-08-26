import React from 'react'
import CategorySlider from '../layout/home/CategorySlider'
import { getNewArrivals } from '../data/shopData'

const WhatsNew = () => {
  return <CategorySlider title="What's New at Tommy" products={getNewArrivals(10)} viewAllHref="/new-arrivals" />
}

export default WhatsNew
