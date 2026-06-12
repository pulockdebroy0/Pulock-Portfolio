import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pulock Deb Roy Portfolio',
    short_name: 'Pulock Portfolio',
    description: 'Experienced web developer, UI/UX designer, and CMO of Ravenence Limited.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d0907',
    theme_color: '#d4a574',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}
