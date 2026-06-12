import type { Metadata } from 'next'
import { Geist, Geist_Mono, Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pulockdebroy.live'),
  title: 'Pulock Deb Roy — CMO of Ravenence Limited',
  description: 'Pulock Deb Roy — CMO of Ravenence Limited. Specializing in web development, app development, UI/UX design, 3D animation, and AI automation solutions.',
  keywords: ['CMO', 'Ravenence Limited', 'web development', 'app development', 'UI/UX design', '3D animation', 'AI automation', 'portfolio', 'Pulock Deb Roy'],
  openGraph: {
    title: 'Pulock Deb Roy — CMO of Ravenence Limited',
    description: 'CMO of Ravenence Limited. Web development, app development, UI/UX design, 3D animation, and AI automation.',
    type: 'website',
    images: [
      {
        url: '/Pulock.jpeg',
        width: 1200,
        height: 630,
        alt: 'Pulock Deb Roy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/Pulock.jpeg'],
  },
  icons: {
    icon: [
      {
        url: '/Pulock.jpeg',
        type: 'image/jpeg',
      },
    ],
    apple: '/Pulock.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pulock Deb Roy",
    "jobTitle": "Chief Marketing Officer (CMO)",
    "worksFor": {
      "@type": "Organization",
      "name": "Ravenence Limited",
      "url": "https://ravenence.com"
    },
    "url": "https://pulockdebroy.live",
    "image": "https://pulockdebroy.live/Pulock.jpeg",
    "description": "Experienced Web Developer, UI/UX Architect, and Chief Marketing Officer (CMO) of Ravenence Limited specializing in AI automation, digital infrastructure, and full-stack solutions.",
    "sameAs": [
      "https://linkedin.com/in/pulockdebroy",
      "https://wa.me/+8801739161076"
    ],
    "knowsAbout": [
      "Web Development",
      "UI/UX Design",
      "AI Automation",
      "CRM & Email Marketing",
      "Next.js",
      "React",
      "PostgreSQL"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sylhet",
      "addressCountry": "Bangladesh"
    }
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${bricolage.variable} font-sans antialiased grain`}>
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
      </body>
    </html>
  )
}
