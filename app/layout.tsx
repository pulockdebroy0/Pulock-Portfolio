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
  title: 'Pulock Deb Roy | Co-Founder & CMO | Full-Stack Web Developer',
  description: 'Pulock Deb Roy is the Co-Founder & Chief Marketing Officer (CMO) of Ravenence Limited, where he leads brand strategy, digital growth, AI-driven marketing, and business development initiatives. With a background in Computer Science & Engineering, he is also a researcher specializing in artificial intelligence, AI automation, digital marketing, UI/UX design, web technologies, SEO, and digital transformation. He works closely with businesses to build scalable digital systems, strengthen brand positioning, and drive measurable business growth through technology, research, and data-driven marketing.',
  keywords: [
    'web developer',
    'full-stack development',
    'Next.js developer',
    'React developer',
    'AI automation',
    'UI/UX design',
    'CMO',
    'Co-Founder',
    'Ravenence Limited',
    'digital product',
    'web development portfolio',
    'Bangladesh',
    'Sylhet'
  ],
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
    viewportFit: 'cover',
  },
  openGraph: {
    title: 'Pulock Deb Roy | Co-Founder & CMO | Full-Stack Developer',
    description: 'Pulock Deb Roy is the Co-Founder & Chief Marketing Officer (CMO) of Ravenence Limited, where he leads brand strategy, digital growth, AI-driven marketing, and business development initiatives. With a background in Computer Science & Engineering, he is also a researcher specializing in artificial intelligence, AI automation, digital marketing, UI/UX design, web technologies, SEO, and digital transformation. He works closely with businesses to build scalable digital systems, strengthen brand positioning, and drive measurable business growth through technology, research, and data-driven marketing.',
    type: 'website',
    url: 'https://pulockdebroy.com',
    siteName: 'Pulock Deb Roy',
    locale: 'en_US',
    images: [
      {
        url: 'https://pulockdebroy.com/Pulock.jpeg',
        width: 1200,
        height: 630,
        alt: 'Pulock Deb Roy - Co-Founder & CMO at Ravenence Limited',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@pulockdebroy',
    site: '@pulockdebroy',
    images: ['https://pulockdebroy.com/Pulock.jpeg'],
    title: 'Pulock Deb Roy | Full-Stack Developer & CMO',
    description: 'Pulock Deb Roy is the Co-Founder & Chief Marketing Officer (CMO) of Ravenence Limited, where he leads brand strategy, digital growth, AI-driven marketing, and business development initiatives. With a background in Computer Science & Engineering, he is also a researcher specializing in artificial intelligence, AI automation, digital marketing, UI/UX design, web technologies, SEO, and digital transformation. He works closely with businesses to build scalable digital systems, strengthen brand positioning, and drive measurable business growth through technology, research, and data-driven marketing.',
  },
  icons: {
    icon: [
      { url: '/Pulock.jpeg', type: 'image/jpeg', sizes: '32x32' },
      { url: '/Pulock.jpeg', type: 'image/jpeg', sizes: '192x192' },
    ],
    apple: '/Pulock.jpeg',
    shortcut: '/Pulock.jpeg',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    bingbot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  referrer: 'strict-origin-when-cross-origin',
  colorScheme: 'dark',
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
      "alternateName": "Pulock Kumar Deb Roy",
      "jobTitle": "Co-Founder & Chief Marketing Officer",
      "url": "https://pulockdebroy.com",
      "image": {
        "@type": "ImageObject",
        "url": "https://pulockdebroy.com/Pulock.jpeg",
        "width": 300,
        "height": 300
      },
      "email": "pulock@ravenence.com",
      "telephone": "+88-01739-161076",
      "givenName": "Pulock",
      "familyName": "Deb Roy",
      "description": "Pulock Deb Roy is the Co-Founder & Chief Marketing Officer (CMO) of Ravenence Limited, where he leads brand strategy, digital growth, AI-driven marketing, and business development initiatives. With a background in Computer Science & Engineering, he is also a researcher specializing in artificial intelligence, AI automation, digital marketing, UI/UX design, web technologies, SEO, and digital transformation. He works closely with businesses to build scalable digital systems, strengthen brand positioning, and drive measurable business growth through technology, research, and data-driven marketing.",
      "sameAs": [
        "https://www.linkedin.com/in/pulock-deb-roy-833584218",
        "https://www.facebook.com/pulockdebroy.dip.9",
        "https://pulockdebroy.com"
      ],
      "worksFor": {
        "@type": "Organization",
        "@id": "https://ravenence.com",
        "name": "Ravenence Limited",
        "url": "https://ravenence.com",
        "description": "Government-registered IT firm based in Sylhet, Bangladesh specializing in custom web applications, AI automation, and digital transformation."
      },
      "knowsAbout": [
        "Full-Stack Web Development",
        "Next.js Development",
        "React Development",
        "UI/UX Design",
        "Brand Strategy",
        "AI Automation Systems",
        "PostgreSQL Database Architecture",
        "CRM Integration",
        "Growth Systems",
        "Digital Strategy",
        "Product Development",
        "API Development"
      ],
      "skills": [
        "Next.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "UI/UX Design",
        "AI Automation",
        "Full-stack Development",
        "Web Development"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sylhet",
        "addressLocality": "Sylhet",
        "addressRegion": "Sylhet Division",
        "addressCountry": "BD",
        "postalCode": "3100"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Professional",
        "email": "pulock@ravenence.com",
        "telephone": "+88-01739-161076"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://pulockdebroy.com",
      "name": "Pulock Deb Roy - Full-Stack Web Developer",
      "description": "Pulock Deb Roy is the Co-Founder & Chief Marketing Officer (CMO) of Ravenence Limited, where he leads brand strategy, digital growth, AI-driven marketing, and business development initiatives. With a background in Computer Science & Engineering, he is also a researcher specializing in artificial intelligence, AI automation, digital marketing, UI/UX design, web technologies, SEO, and digital transformation. He works closely with businesses to build scalable digital systems, strengthen brand positioning, and drive measurable business growth through technology, research, and data-driven marketing.",
      "url": "https://pulockdebroy.com",
      "creator": {
        "@type": "Person",
        "@id": "https://pulockdebroy.com",
        "name": "Pulock Deb Roy"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://pulockdebroy.com?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "Person",
        "@id": "https://pulockdebroy.com"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://pulockdebroy.com",
      "name": "Pulock Deb Roy | Co-Founder & CMO | Full-Stack Developer",
      "description": "Pulock Deb Roy is the Co-Founder & Chief Marketing Officer (CMO) of Ravenence Limited, where he leads brand strategy, digital growth, AI-driven marketing, and business development initiatives. With a background in Computer Science & Engineering, he is also a researcher specializing in artificial intelligence, AI automation, digital marketing, UI/UX design, web technologies, SEO, and digital transformation. He works closely with businesses to build scalable digital systems, strengthen brand positioning, and drive measurable business growth through technology, research, and data-driven marketing.",
      "url": "https://pulockdebroy.com",
      "author": {
        "@type": "Person",
        "@id": "https://pulockdebroy.com",
        "name": "Pulock Deb Roy"
      },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pulockdebroy.com"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "xpath": [
          "/html/body/main/section[1]//h1",
          "/html/body/main/section[1]//p[1]",
          "/html/body/main/section[2]//h2",
          "/html/body/main/section[2]//p[1]"
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://pulockdebroy.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "https://pulockdebroy.com#story"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Services",
          "item": "https://pulockdebroy.com#services"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Portfolio",
          "item": "https://pulockdebroy.com#portfolio"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Contact",
          "item": "https://pulockdebroy.com#contact"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://pulockdebroy.com",
      "name": "Pulock Deb Roy",
      "url": "https://pulockdebroy.com",
      "describedBy": {
        "@type": "Person",
        "@id": "https://pulockdebroy.com",
        "name": "Pulock Deb Roy",
        "jobTitle": "Co-Founder & CMO"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Pulock Deb Roy offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pulock offers full-stack web development, AI automation systems, UI/UX design, and digital strategy consulting. He specializes in Next.js and React applications with PostgreSQL backends, custom automation workflows, and scalable digital infrastructure for businesses looking to grow."
          }
        },
        {
          "@type": "Question",
          "name": "What technologies does Pulock use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Primary tech stack includes Next.js, React, TypeScript, PostgreSQL, Tailwind CSS, and Node.js for backend services. He also works with AI automation tools, CRM platforms, and modern DevOps practices. All projects are built with scalability, performance, and maintainability in mind."
          }
        },
        {
          "@type": "Question",
          "name": "How much experience does Pulock have?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pulock has 5+ years of professional experience in web development and product strategy. He has successfully completed 50+ projects ranging from startup MVPs to enterprise-scale applications. Currently serves as Co-Founder & CMO at Ravenence Limited."
          }
        },
        {
          "@type": "Question",
          "name": "What is Ravenence Limited?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ravenence Limited is a government-registered IT firm based in Sylhet, Bangladesh. Founded by Pulock Deb Roy and co-founders, it specializes in custom web applications, AI automation, digital transformation, and growth infrastructure for businesses worldwide."
          }
        },
        {
          "@type": "Question",
          "name": "Can Pulock help with AI automation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, automation and AI integration is a core service. Pulock specializes in building intelligent workflows, chatbots, lead qualification systems, email automation, and integrating AI services into existing applications to improve efficiency."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact Pulock?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach out via email at pulock@ravenence.com, WhatsApp at +88-01739-161076, or connect on LinkedIn at linkedin.com/in/pulock-deb-roy-833584218. Response time is typically within 24 hours."
          }
        }
      ]
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
