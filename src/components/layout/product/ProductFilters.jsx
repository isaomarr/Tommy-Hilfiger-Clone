import React, { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { FiChevronDown, FiSliders } from 'react-icons/fi'
import FilterDrawer from './FilterDrawer'
import { filters, getFilterCounts, getGenderCounts } from '../../data/shopData'

const parseCsv = (value) => (value ? value.split(',').filter(Boolean) : [])

const FilterTrigger = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-full border px-4 py-2 text-sm flex items-center gap-1.5 ${active ? 'border-black text-black' : 'border-gray-300 text-gray-700'}`}
  >
    {label}
    <FiChevronDown className="text-xs" />
  </button>
)

const ProductFilters = ({ baseList = [], genderScopeList = baseList, resultCount = 0 }) => {
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerSection, setDrawerSection] = useState('gender')

  const openDrawer = (section) => {
    setDrawerSection(section)
    setIsDrawerOpen(true)
  }

  const activeCats = parseCsv(searchParams.get('cat'))
  const activeSizes = parseCsv(searchParams.get('size'))
  const activeColors = parseCsv(searchParams.get('color'))
  const activeFits = parseCsv(searchParams.get('fit'))
  const activePrice = searchParams.get('price') || ''
  const activeSort = searchParams.get('sort') || 'featured'

  const { subcategoryCounts, sizeCounts } = useMemo(() => getFilterCounts(baseList), [baseList])
  const genderCounts = useMemo(() => getGenderCounts(genderScopeList), [genderScopeList])
  const sizeOptions = Object.keys(sizeCounts)
  const catOptions = Object.keys(subcategoryCounts).sort()
  const showGender = !!category && Object.keys(genderCounts).length > 0

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    setSearchParams(next)
  }

  const clearAll = () => setSearchParams({})

  const hasActiveFilters =
    activeCats.length || activeSizes.length || activeColors.length || activeFits.length || activePrice

  return (
    <div className="flex flex-wrap items-center gap-3 py-6">
      {showGender && <FilterTrigger label="Gender" active={false} onClick={() => openDrawer('gender')} />}

      {catOptions.length > 1 && (
        <FilterTrigger label="Category" active={activeCats.length > 0} onClick={() => openDrawer('category')} />
      )}

      {sizeOptions.length > 0 && (
        <FilterTrigger label="Size" active={activeSizes.length > 0} onClick={() => openDrawer('size')} />
      )}

      <FilterTrigger label="Color" active={activeColors.length > 0} onClick={() => openDrawer('color')} />

      <FilterTrigger label="Price" active={!!activePrice} onClick={() => openDrawer('price')} />

      <button
        onClick={() => openDrawer('gender')}
        className={`rounded-full border px-4 py-2 text-sm flex items-center gap-1.5 ${hasActiveFilters ? 'border-black text-black' : 'border-gray-300 text-gray-700'}`}
      >
        All Filters
        <FiSliders className="text-xs" />
      </button>

      {hasActiveFilters ? (
        <button onClick={clearAll} className="text-sm underline text-gray-500">
          Clear Filters
        </button>
      ) : null}

      <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
        <span>{resultCount} Items | Sort By</span>
        <select
          value={activeSort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="rounded-full border border-gray-300 px-3 py-2 text-sm text-black"
        >
          {filters.sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        baseList={baseList}
        genderScopeList={genderScopeList}
        resultCount={resultCount}
        initialSection={drawerSection}
      />
    </div>
  )
}

export default ProductFilters
