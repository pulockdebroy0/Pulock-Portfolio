import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pulock Deb Roy - Co-Founder & CMO',
    short_name: 'Pulock Deb Roy',
    description: 'Web developer and digital architect. Co-Founder & CMO at Ravenence Limited.',
    start_url: 'https://pulockdebroy.com',
    display: 'standalone',
    background_color: '#0d0907',
    theme_color: '#d4a574',
    scope: 'https://pulockdebroy.com',
    icons: [
      {
        src: '/Pulock.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'any maskable',
      },
      {
        src: '/Pulock.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any maskable',
      },
    ],
    categories: ['business', 'productivity'],
    screenshots: [
      {
        src: '/Pulock.jpeg',
        type: 'image/jpeg',
        sizes: '540x720',
        form_factor: 'narrow',
      },
    ],
  }
}
