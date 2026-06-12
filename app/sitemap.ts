import type { MetadataRoute } from 'next'
import sql from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pulockdebroy.live'
  let sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  try {
    // Attempt to fetch portfolio items for mapping deep links
    const items = await sql`
      SELECT id, updated_at as "updatedAt"
      FROM portfolio
      ORDER BY order_index ASC
    `
    if (Array.isArray(items)) {
      items.forEach((item) => {
        sitemapEntries.push({
          url: `${baseUrl}/#portfolio`, // Point to target component ID anchor as there are no direct subpages
          lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        })
      })
    }
  } catch (error) {
    console.error('[SEO/Sitemap] Fetch error:', error)
  }

  return sitemapEntries
}
