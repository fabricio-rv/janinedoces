import { groq } from "next-sanity"

// Get all active products
export const PRODUCTS_QUERY = groq`*[_type == "product" && active == true] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  price,
  minOrder,
  description,
  "image": image.asset->url,
  badges,
  flavors,
  moods,
  "category": category->name,
  "occasions": occasions[]->name,
  active
}`

// Get product by slug
export const PRODUCT_BY_SLUG_QUERY = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  price,
  minOrder,
  description,
  "image": image.asset->url,
  badges,
  flavors,
  moods,
  "category": category->name,
  "occasions": occasions[]->name,
  active
}`

// Get all categories
export const CATEGORIES_QUERY = groq`*[_type == "category"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description
}`

// Get all occasions
export const OCCASIONS_QUERY = groq`*[_type == "occasion" && active == true] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  active
}`

// Get all collections
export const COLLECTIONS_QUERY = groq`*[_type == "collection" && active == true] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  "image": image.asset->url,
  order,
  active
}`

// Get collection by slug
export const COLLECTION_BY_SLUG_QUERY = groq`*[_type == "collection" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  "image": image.asset->url,
  order,
  active
}`

// Get all gallery items
export const GALLERY_ITEMS_QUERY = groq`*[_type == "galleryItem" && active == true] | order(order asc) {
  _id,
  title,
  "occasion": occasion->name,
  "image": image.asset->url,
  order,
  active
}`

// Get all FAQs
export const FAQS_QUERY = groq`*[_type == "faq" && active == true] | order(order asc) {
  _id,
  question,
  answer,
  order,
  active
}`

// Get site settings
export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  _id,
  easterEnabled,
  easterCollectionName,
  tastingEnabled,
  tastingNote
}`
