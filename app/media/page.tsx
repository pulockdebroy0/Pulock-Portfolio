import type { Metadata } from 'next'
import { MediaGallery } from '@/components/media-gallery'

export const metadata: Metadata = {
  title: 'Media Gallery | Pulock Deb Roy',
  description: 'Explore photos and visual content from Pulock Deb Roy - Co-Founder & CMO at Ravenence Limited. Browse media gallery showcasing projects, events, and professional highlights.',
  keywords: ['media gallery', 'photos', 'portfolio', 'visual content', 'Pulock Deb Roy'],
  openGraph: {
    title: 'Media Gallery | Pulock Deb Roy',
    description: 'Explore photos and visual content from Pulock Deb Roy - Co-Founder & CMO at Ravenence Limited.',
    type: 'website',
    url: 'https://pulockdebroy.com/media',
    images: [
      {
        url: 'https://pulockdebroy.com/Pulock.jpeg',
        width: 1200,
        height: 630,
        alt: 'Pulock Deb Roy Media Gallery',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Gallery | Pulock Deb Roy',
    description: 'Explore photos and visual content from Pulock Deb Roy.',
    images: ['https://pulockdebroy.com/Pulock.jpeg'],
  },
  alternates: {
    canonical: 'https://pulockdebroy.com/media',
  },
}

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-foreground mb-4">Media Gallery</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Explore photos and visual content from my professional journey. Browse through projects, events, and moments that showcase the work and impact at Ravenence Limited.
          </p>
        </div>
        <MediaGallery />
      </div>

      {/* JSON-LD for Gallery Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Media Gallery',
            description: 'Explore photos and visual content from Pulock Deb Roy - Co-Founder & CMO at Ravenence Limited.',
            url: 'https://pulockdebroy.com/media',
            mainEntity: {
              '@type': 'Person',
              name: 'Pulock Deb Roy',
              url: 'https://pulockdebroy.com',
            },
          }),
        }}
      />
    </main>
  )
}
