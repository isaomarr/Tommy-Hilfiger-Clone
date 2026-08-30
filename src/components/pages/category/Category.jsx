import React, { useMemo } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import ProductFilters from '../../layout/product/ProductFilters'
import ProductGrid from '../../layout/product/ProductGrid'
import NotFound from '../notfound/NotFound'
import {
  products,
  navigation,
  getSale,
  getNewArrivals,
  filterProducts,
  sortProducts,
  search as searchProducts,
} from '../../data/shopData'

const VALID_CATEGORIES = [...navigation.map((n) => n.slug), 'kids', 'shoes-accessories', 'tommy-jeans']
const SHOP_ALL_TAB_CATEGORIES = ['new-arrivals', 'sale', 'shoes-accessories', 'tommy-jeans']
const PLAIN_GENDER_CATEGORIES = ['men', 'women', 'boys', 'girls', 'kids']

const CATEGORY_LABELS = {
  men: 'Men',
  women: 'Women',
  boys: 'Boys',
  girls: 'Girls',
  kids: 'Kids',
  'new-arrivals': 'New Arrivals',
  sale: 'Sale',
  'shoes-accessories': 'Shoes & Accessories',
  'tommy-jeans': 'Tommy Jeans',
}

const filterByGender = (base, gender) => {
  if (!gender) return base
  if (gender === 'kids') return base.filter((p) => p.category === 'boys' || p.category === 'girls')
  return base.filter((p) => p.category === gender)
}

const resolveBaseList = (category, subcategory) => {
  if (category === 'new-arrivals') return filterByGender(getNewArrivals(999), subcategory)
  if (category === 'sale') return filterByGender(getSale(), subcategory)
  if (category === 'shoes-accessories') {
    return filterByGender(
      products.filter((p) => p.subcategory === 'shoes' || p.subcategory === 'accessories'),
      subcategory
    )
  }
  if (category === 'tommy-jeans') {
    return filterByGender(
      products.filter((p) => p.subcategory === 'jeans'),
      subcategory
    )
  }
  if (category === 'kids') {
    const base = products.filter((p) => p.category === 'boys' || p.category === 'girls')
    return subcategory ? base.filter((p) => p.subcategory === subcategory) : base
  }
  return products.filter((p) => p.category === category && (!subcategory || p.subcategory === subcategory))
}

const Category = () => {
  const { category, subcategory } = useParams()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const isSearchMode = location.pathname === '/search'
  const query = searchParams.get('q') || ''

  const baseList = useMemo(() => {
    if (isSearchMode) return searchProducts(query)
    return resolveBaseList(category, subcategory)
  }, [isSearchMode, query, category, subcategory])

 
  const genderScopeList = useMemo(() => {
    if (isSearchMode) return []
    if (PLAIN_GENDER_CATEGORIES.includes(category)) return products
    return resolveBaseList(category, undefined)
  }, [isSearchMode, category])

  const isValidCategory = isSearchMode || VALID_CATEGORIES.includes(category)

  const filtered = useMemo(() => {
    const subcategories = parseCsv(searchParams.get('cat'))
    const sizes = parseCsv(searchParams.get('size'))
    const colors = parseCsv(searchParams.get('color'))
    const fits = parseCsv(searchParams.get('fit'))
    const priceParam = searchParams.get('price')
    const [min, max] = priceParam ? priceParam.split('-').map(Number) : [undefined, undefined]
    const sortBy = searchParams.get('sort') || 'featured'

    const result = filterProducts({ subcategories, sizes, colors, fits, min, max }, baseList)
    return sortProducts(result, sortBy)
  }, [baseList, searchParams])

  if (!isValidCategory) {
    return <NotFound />
  }

  const title = isSearchMode ? `Search results for "${query}"` : CATEGORY_LABELS[category] || category
  const isPlainGender = PLAIN_GENDER_CATEGORIES.includes(category)
  const showTabs = !isSearchMode && (SHOP_ALL_TAB_CATEGORIES.includes(category) || isPlainGender)
  const activeGender = isPlainGender ? (category === 'boys' || category === 'girls' ? 'kids' : category) : subcategory

  const tabs = [
    { label: 'Shop All', to: isPlainGender ? '/new-arrivals' : `/${category}`, active: !isPlainGender && !subcategory },
    { label: 'Men', to: isPlainGender ? '/men' : `/${category}/men`, active: activeGender === 'men' },
    { label: 'Women', to: isPlainGender ? '/women' : `/${category}/women`, active: activeGender === 'women' },
    { label: 'Kids', to: isPlainGender ? '/kids' : `/${category}/kids`, active: activeGender === 'kids' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-5xl font-medium text-center py-12">{title}</h1>

      {showTabs && (
        <div className="flex gap-6 text-sm pb-4 mb-2">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              to={tab.to}
              className={
                tab.active
                  ? 'font-medium text-black visited:text-black underline'
                  : 'text-gray-500 visited:text-gray-500 hover:text-black'
              }
            >
              {tab.label}
            </Link>
          ))}
        </div>
      )}

      <ProductFilters baseList={baseList} genderScopeList={genderScopeList} resultCount={filtered.length} />
      <div className="pt-8">
        <ProductGrid products={filtered} />
      </div>
    </div>
  )
}

const parseCsv = (value) => (value ? value.split(',').filter(Boolean) : [])

export default Category
