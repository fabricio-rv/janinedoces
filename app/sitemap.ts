import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://janinebiccadoces.com.br'

  return [
    {
      url: baseUrl, // Home
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Alta prioridade (Vendas)
    },
    {
      url: `${baseUrl}/monte-sua-caixa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Alta prioridade (Diferencial)
    },
    {
      url: `${baseUrl}/colecoes`, // Sazonal (Natal/Páscoa)
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: new Date(),
      changeFrequency: 'monthly', // Muda menos frequência
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}