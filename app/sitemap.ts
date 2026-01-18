import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://janinebiccadoces.com.br"

  const routes = [
    "",
    "/catalogo",
    "/degustacao",
    "/faq",
    "/galeria",
    "/monte-sua-caixa",
    "/sobre",
  ]

  const now = new Date()

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "weekly",
    priority:
      route === "" ? 1 :
        route === "/catalogo" || route === "/monte-sua-caixa" ? 0.9 :
          route === "/degustacao" ? 0.8 :
            route === "/galeria" ? 0.7 :
              route === "/faq" ? 0.6 :
                0.6,
  }))
}
