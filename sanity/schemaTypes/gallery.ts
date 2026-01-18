import { defineField, defineType } from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Galeria de Eventos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Evento (Ex: Casamento Silva)',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Data do Evento',
      type: 'date',
    }),
    defineField({
      name: 'coverImage',
      title: 'Capa do Álbum',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Fotos do Evento',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid', // Mostra como uma grade de fotos bonitinha
      },
    }),
  ],
})