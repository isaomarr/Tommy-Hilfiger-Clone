// shopData.js — src/data/shopData.js
// import data from "./th-clone-data.json";
import data from "./th-clone-data.json";

export const meta = data.meta;
export const navigation = data.navigation;
export const filters = data.filters;
export const heroSlides = data.heroSlides;
export const footer = data.footer;
export const products = data.products;

export const getBySlug = (slug) => products.find((p) => p.slug === slug);

export const getByCategory = (category, subcategory) =>
  products.filter(
    (p) =>
      p.category === category && (!subcategory || p.subcategory === subcategory)
  );

export const getNewArrivals = (limit = 12) =>
  [...products]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);

export const getSale = () => products.filter((p) => p.badges.includes("sale"));

export const getBestsellers = (limit = 8) =>
  products.filter((p) => p.badges.includes("bestseller")).slice(0, limit);

export const search = (q) => {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(s) ||
      p.subcategory.includes(s) ||
      p.category.includes(s)
  );
};

// opts: { category, subcategory, sizes: [], colors: [], fits: [], min, max, onSale }
// list: optional pre-resolved base list (e.g. a virtual category like "sale" or "kids")
export const filterProducts = (opts = {}, list = products) =>
  list.filter((p) => {
    if (opts.category && p.category !== opts.category) return false;
    if (opts.subcategory && p.subcategory !== opts.subcategory) return false;
    if (opts.subcategories?.length && !opts.subcategories.includes(p.subcategory))
      return false;
    if (opts.onSale && !p.badges.includes("sale")) return false;
    if (opts.min != null && p.price < opts.min) return false;
    if (opts.max != null && p.price > opts.max) return false;
    if (opts.fits?.length && !opts.fits.includes(p.fit)) return false;
    if (opts.sizes?.length && !opts.sizes.some((s) => p.sizes.includes(s)))
      return false;
    if (
      opts.colors?.length &&
      !opts.colors.some((c) => p.colors.some((pc) => pc.name === c))
    )
      return false;
    return true;
  });

export const sortProducts = (list, sortBy = "featured") => {
  const arr = [...list];
  switch (sortBy) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "newest":
      return arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating);
    default:
      return arr;
  }
};

export const formatPrice = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

// Shared "how many items in this list match each filter value" counts —
// used by both the individual filter pill dropdowns and the All Filters drawer
// so the two stay in sync.
export const getFilterCounts = (list) => {
  const subcategoryCounts = {};
  const sizeCounts = {};
  const colorCounts = {};
  const fitCounts = {};

  list.forEach((p) => {
    subcategoryCounts[p.subcategory] = (subcategoryCounts[p.subcategory] || 0) + 1;
    p.sizes.forEach((s) => {
      sizeCounts[s] = (sizeCounts[s] || 0) + 1;
    });
    p.colors.forEach((c) => {
      colorCounts[c.name] = (colorCounts[c.name] || 0) + 1;
    });
    fitCounts[p.fit] = (fitCounts[p.fit] || 0) + 1;
  });

  const priceCounts = filters.priceRanges.map((range) => ({
    ...range,
    count: list.filter((p) => p.price >= range.min && p.price <= range.max).length,
  }));

  return { subcategoryCounts, sizeCounts, colorCounts, fitCounts, priceCounts };
};

// Gender counts only (men/women/boys/girls kept separate, matching usa.tommy.com's
// own Gender filter), computed from a list that hasn't had gender narrowed out yet —
// lets the Gender filter show all four options (with counts) even while viewing a
// single-gender page like /men, instead of only showing the currently-active gender.
export const getGenderCounts = (list) => {
  const counts = {};
  list.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return counts;
};

export const subcategoryLabel = (slug) => {
  for (const nav of navigation) {
    const found = nav.subcategories.find((s) => s.slug === slug);
    if (found) return found.name;
  }
  return slug;
};

// Header nav (Navbar + MobilMenu share this) — mirrors usa.tommy.com's top-level
// nav order/labels, with "Kids" merging boys+girls and "Shoes & Accessories" /
// "Tommy Jeans" derived as cross-category subcategory rollups (not real
// top-level categories in the data, so they carry no subcategories of their own).
const getNavEntry = (slug) => navigation.find((n) => n.slug === slug);

const men = getNavEntry("men");
const women = getNavEntry("women");
const boys = getNavEntry("boys");
const girls = getNavEntry("girls");

const kidsSubcategoryMap = new Map();
[...(boys?.subcategories || []), ...(girls?.subcategories || [])].forEach((sub) => {
  if (!kidsSubcategoryMap.has(sub.slug)) kidsSubcategoryMap.set(sub.slug, sub);
});

export const mainNavItems = [
  { slug: "new-arrivals", name: "New", subcategories: [] },
  { slug: "men", name: "Men", subcategories: men?.subcategories || [] },
  { slug: "women", name: "Women", subcategories: women?.subcategories || [] },
  { slug: "kids", name: "Kids", subcategories: Array.from(kidsSubcategoryMap.values()) },
  { slug: "shoes-accessories", name: "Shoes & Accessories", subcategories: [] },
  { slug: "tommy-jeans", name: "Tommy Jeans", subcategories: [] },
  { slug: "sale", name: "Sale", subcategories: [] },
];
