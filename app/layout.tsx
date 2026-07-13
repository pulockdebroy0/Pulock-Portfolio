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
  metadataBase: new URL('https://pulockdebroy.com'),
  title: 'Pulock Deb Roy — Co-Founder & CMO at Ravenence Limited',
  description: 'Pulock Deb Roy, Co-Founder & CMO at Ravenence Limited. Web developer and digital architect specializing in full-stack development, AI automation, and scalable growth systems.',
  keywords: ['Co-Founder', 'CMO', 'Ravenence Limited', 'web developer', 'UI/UX design', 'AI automation', 'Next.js', 'React', 'full-stack development', 'portfolio'],
  authors: [{ name: 'Pulock Deb Roy', url: 'https://pulockdebroy.com' }],
  creator: 'Pulock Deb Roy',
  publisher: 'Pulock Deb Roy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://pulockdebroy.com',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    title: 'Pulock Deb Roy — Co-Founder & CMO at Ravenence Limited',
    description: 'Web developer, UI/UX architect, and Co-Founder & CMO at Ravenence Limited. Building scalable digital products and growth systems.',
    type: 'website',
    url: 'https://pulockdebroy.com',
    images: [
      {
        url: 'https://pulockdebroy.com/Pulock.jpeg',
        width: 1200,
        height: 630,
        alt: 'Pulock Deb Roy - Co-Founder & CMO at Ravenence Limited',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@pulockdebroy',
    images: ['https://pulockdebroy.com/Pulock.jpeg'],
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://pulockdebroy.com",
      "name": "Pulock Deb Roy",
      "jobTitle": "Co-Founder & Chief Marketing Officer",
      "url": "https://pulockdebroy.com",
      "image": "https://pulockdebroy.com/Pulock.jpeg",
      "email": "pulock@ravenence.com",
      "description": "Web developer, UI/UX architect, and Co-Founder & CMO at Ravenence Limited. Specializing in full-stack development, AI automation, and scalable growth systems.",
      "sameAs": [
        "https://www.linkedin.com/in/pulock-deb-roy-833584218"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Ravenence Limited",
        "url": "https://ravenence.com"
      },
      "knowsAbout": [
        "Full-Stack Web Development",
        "React & Next.js",
        "UI/UX Design & Brand Strategy",
        "AI Automation Systems",
        "PostgreSQL & Database Architecture",
        "CRM Integration",
        "Growth Systems",
        "Digital Strategy"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sylhet",
        "addressRegion": "Sylhet",
        "addressCountry": "BD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Pulock Deb Roy",
      "url": "https://pulockdebroy.com",
      "creator": {
        "@type": "Person",
        "name": "Pulock Deb Roy"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://pulockdebroy.com"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]

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
