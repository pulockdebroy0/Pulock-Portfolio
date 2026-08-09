import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import sql from '@/lib/db'
import type { Media } from '@/lib/types'

const siteUrl = 'https://pulockdebroy.com'
const copyrightNotice = '© Pulock Deb Roy. All rights reserved.'

type Props = { params: Promise<{ slug: string }> }

async function getMedia(slug: string): Promise<Media | null> {
  const result = await sql`
    SELECT id, title, description, image_url as "imageUrl", alt_text as "altText", slug, featured, created_at as "createdAt", updated_at as "updatedAt"
    FROM media
    WHERE slug = ${slug}
    LIMIT 1
  `
  return (result[0] as Media | undefined) ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const media = await getMedia(slug)
  if (!media) return { title: 'Media not found | Pulock Deb Roy', robots: { index: false, follow: true } }

  const description = media.description || media.altText || media.title
  const url = `${siteUrl}/media/${media.slug}`
  return {
    title: `${media.title} | Pulock Deb Roy`,
    description,
    authors: [{ name: 'Pulock Deb Roy', url: siteUrl }],
    creator: 'Pulock Deb Roy',
    openGraph: { title: media.title, description, url, type: 'article', images: [{ url: media.imageUrl, alt: media.altText || media.title }] },
    twitter: { card: 'summary_large_image', title: media.title, description, images: [media.imageUrl] },
    alternates: { canonical: url },
    other: { copyright: copyrightNotice },
  }
}

export default async function MediaDetailPage({ params }: Props) {
  const { slug } = await params
  const media = await getMedia(slug)
  if (!media) notFound()

  const url = `${siteUrl}/media/${media.slug}`
  const description = media.description || media.altText || media.title
  const imageObject = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${url}#image`,
    url: media.imageUrl,
    contentUrl: media.imageUrl,
    name: media.title,
    description,
    caption: media.title,
    creator: { '@id': `${siteUrl}/#person`, '@type': 'Person', name: 'Pulock Deb Roy', url: `${siteUrl}/` },
    copyrightHolder: { '@id': `${siteUrl}/#person`, '@type': 'Person', name: 'Pulock Deb Roy' },
    copyrightNotice,
  }
  const pageObject = { '@context': 'https://schema.org', '@graph': [imageObject, { '@type': 'ImageGallery', '@id': `${url}#page`, url, name: media.title, image: { '@id': `${url}#image` }, mainEntity: { '@id': `${url}#image` }, author: { '@id': `${siteUrl}/#person` } }] }

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground md:px-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/media" className="text-sm text-primary underline-offset-4 hover:underline">← Back to Media</Link>
        <article className="mt-8">
          <div className="overflow-hidden rounded-xl border border-border bg-card p-3 shadow-sm">
            <img src={media.imageUrl} alt={media.altText || media.title} className="mx-auto max-h-[75vh] w-full object-contain" />
          </div>
          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-balance text-4xl font-serif font-bold md:text-5xl">{media.title}</h1>
              {media.featured && <span className="rounded-full bg-accent/15 px-3 py-1 text-sm text-accent">Featured</span>}
            </div>
            {media.description && <p className="mt-5 text-lg leading-relaxed text-foreground/75">{media.description}</p>}
            <p className="mt-5 text-sm text-foreground/60"><span className="font-medium text-foreground">Alt text:</span> {media.altText || media.title}</p>
            <p className="mt-3 text-sm text-foreground/60">{copyrightNotice}</p>
          </div>
        </article>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageObject) }} />
    </main>
  )
}
