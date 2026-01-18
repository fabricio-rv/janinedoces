import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product' 
import { gallery } from './gallery'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, gallery],
}