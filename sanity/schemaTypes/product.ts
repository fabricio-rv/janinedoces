import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Produtos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Doce',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Link automático)',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge (Etiqueta no topo)',
      description: 'Ex: Linha Fina, Mais Vendido, Novidade',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'flavors',
      title: 'Sabores Disponíveis',
      description: 'Ex: Belga, Avelã, Maracujá (Pressione Enter após cada um)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'occasions',
      title: 'Ideal para (Tags)',
      description: 'Ex: Dia das Mães, Corporativo, Casamento',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'minOrder',
      title: 'Pedido Mínimo (Unidades/Caixas)',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'price',
      title: 'Preço (R$)',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto Principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Categoria Principal',
      type: 'string',
      options: {
        list: [
          { title: 'Trufas', value: 'trufas' },
          { title: 'Doces Finos', value: 'doces-finos' },
          { title: 'Brigadeiros', value: 'brigadeiros' },
          { title: 'Páscoa', value: 'pascoa' },
          { title: 'Presentes', value: 'presentes' },
        ],
      },
    }),
  ],
})