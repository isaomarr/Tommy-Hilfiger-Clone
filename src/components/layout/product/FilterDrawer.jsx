import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { FiChevronDown, FiX } from 'react-icons/fi'
import { filters, getFilterCounts, getGenderCounts, subcategoryLabel } from '../../data/shopData'

const parseCsv = (value) => (value ? value.split(',').filter(Boolean) : [])

const PLAIN_GENDER_CATEGORIES = ['men', 'women', 'boys', 'girls', 'kids']

const AccordionSection = ({ id, title, isOpen, onToggle, children }) => (
  <div id={id} className="border-b">
    <button onClick={onToggle} className="w-full flex items-center justify-between py-4 font-medium">
      {title}
      <FiChevronDown className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div
      className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
    >
      <div className="overflow-hidden">
        <div className="pb-4">{children}</div>
      </div>
    </div>
  </div>
)

const FilterDrawer = ({ isOpen, onClose, baseList, genderScopeList = baseList, resultCount, initialSection }) => {
  const { category, subcategory } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [openSections, setOpenSections] = useState({ gender: true })

  const toggleSection = (key) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))

  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || !initialSection) return
    setOpenSections({ [initialSection]: true })
    const el = document.getElementById(`filter-section-${initialSection}`)
    el?.scrollIntoView({ block: 'start' })
  }, [isOpen, initialSection])

  const activeCats = parseCsv(searchParams.get('cat'))
  const activeSizes = parseCsv(searchParams.get('size'))
  const activeColors = parseCsv(searchParams.get('color'))
  const activePrice = searchParams.get('price') || ''

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  const toggleCsvParam = (key, value) => {
    const current = parseCsv(searchParams.get(key))
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    updateParam(key, next.join(','))
  }

  const clearAll = () => {
    const next = new URLSearchParams(searchParams)
    ;['cat', 'size', 'color', 'fit', 'price'].forEach((k) => next.delete(k))
    setSearchParams(next)
  }

  const { subcategoryCounts, sizeCounts, colorCounts, priceCounts } = useMemo(
    () => getFilterCounts(baseList),
    [baseList]
  )
  const genderCounts = useMemo(() => getGenderCounts(genderScopeList), [genderScopeList])
  const showGender = !!category && Object.keys(genderCounts).length > 0
  const isPlainGender = PLAIN_GENDER_CATEGORIES.includes(category)
  const genderTo = (g) => (isPlainGender ? `/${g}` : `/${category}/${g}`)
  const activeGender = isPlainGender ? category : subcategory
  const catOptions = Object.keys(subcategoryCounts).sort()
  const sizeOptions = Object.keys(sizeCounts)

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-45 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-lg flex flex-col transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0">
          <span className="font-medium">Filter</span>
          <button onClick={onClose} aria-label="Close filters">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {showGender && (
            <AccordionSection id="filter-section-gender" title="Gender" isOpen={!!openSections.gender} onToggle={() => toggleSection('gender')}>
              <div className="flex flex-col gap-2">
                {['women', 'men', 'girls', 'boys'].map((g) =>
                  genderCounts[g] ? (
                    <Link key={g} to={genderTo(g)} onClick={onClose} className="flex items-center gap-2 text-sm">
                      <span
                        className={`w-4 h-4 border ${activeGender === g ? 'bg-[#0a1a3c] border-[#0a1a3c]' : 'border-gray-400'}`}
                      />
                      <span className="capitalize">{g}</span>
                      <span className="text-gray-400">({genderCounts[g]})</span>
                    </Link>
                  ) : null
                )}
              </div>
            </AccordionSection>
          )}

          {catOptions.length > 1 && (
            <AccordionSection id="filter-section-category" title="Category" isOpen={!!openSections.category} onToggle={() => toggleSection('category')}>
              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {catOptions.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={activeCats.includes(cat)} onChange={() => toggleCsvParam('cat', cat)} />
                    {subcategoryLabel(cat)}
                    <span className="text-gray-400">({subcategoryCounts[cat]})</span>
                  </label>
                ))}
              </div>
            </AccordionSection>
          )}

          {sizeOptions.length > 0 && (
            <AccordionSection id="filter-section-size" title="Size" isOpen={!!openSections.size} onToggle={() => toggleSection('size')}>
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleCsvParam('size', size)}
                    className={`border px-2 py-2 text-xs ${activeSizes.includes(size) ? 'bg-[#0a1a3c] text-white border-[#0a1a3c]' : 'border-gray-300'}`}
                  >
                    {size} ({sizeCounts[size]})
                  </button>
                ))}
              </div>
            </AccordionSection>
          )}

          <AccordionSection id="filter-section-color" title="Color" isOpen={!!openSections.color} onToggle={() => toggleSection('color')}>
            <div className="flex flex-col gap-2">
              {filters.color
                .filter((c) => colorCounts[c.name])
                .map((c) => (
                  <label key={c.name} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={activeColors.includes(c.name)} onChange={() => toggleCsvParam('color', c.name)} />
                    <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: c.hex }} />
                    {c.name}
                    <span className="text-gray-400">({colorCounts[c.name]})</span>
                  </label>
                ))}
            </div>
          </AccordionSection>

          <AccordionSection id="filter-section-price" title="Price" isOpen={!!openSections.price} onToggle={() => toggleSection('price')}>
            <div className="flex flex-col gap-2">
              {priceCounts
                .filter((r) => r.count > 0)
                .map((range) => {
                  const value = `${range.min}-${range.max}`
                  return (
                    <label key={range.label} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={activePrice === value}
                        onChange={() => updateParam('price', activePrice === value ? '' : value)}
                      />
                      {range.label}
                      <span className="text-gray-400">({range.count})</span>
                    </label>
                  )
                })}
            </div>
          </AccordionSection>
        </div>

        <div className="shrink-0 border-t px-6 py-4 flex gap-3">
          <button onClick={clearAll} className="flex-1 border border-black py-3 text-sm font-medium">
            Clear All
          </button>
          <button onClick={onClose} className="flex-1 bg-black text-white py-3 text-sm font-medium">
            View {resultCount} Items
          </button>
        </div>
      </div>
    </>
  )
}

export default FilterDrawer
