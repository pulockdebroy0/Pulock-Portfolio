import type { MetadataRoute } from 'next'
import sql from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pulockdebroy.com'
  
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/media/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/license/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]

  const media = await sql`SELECT slug, updated_at as "updatedAt" FROM media WHERE slug IS NOT NULL AND slug <> ''` as unknown as Array<{ slug: string; updatedAt: Date }>
  sitemapEntries.push(
    ...media.map((item: { slug: string; updatedAt: Date }) => ({
      url: `${baseUrl}/media/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return sitemapEntries
}
