import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://pulockdebroy.com'

export const metadata: Metadata = {
  title: 'Image licensing | Pulock Deb Roy',
  description: 'Image licensing, attribution, and permission information for Pulock Deb Roy media.',
  alternates: { canonical: `${siteUrl}/license/` },
  robots: { index: true, follow: true },
}

export default function LicensePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground md:px-12">
      <article className="mx-auto max-w-3xl">
        <Link href="/media/" className="text-sm text-primary underline-offset-4 hover:underline">
          Back to Media
        </Link>
        <h1 className="mt-8 text-balance text-4xl font-serif font-bold md:text-5xl">Image licensing</h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/75">
          The images published on this website are owned by or used with permission by Pulock Deb Roy.
          Please request written permission before reproducing, editing, distributing, or commercially using any image.
        </p>
        <section className="mt-10 border-t border-border pt-8">
          <h2 className="text-2xl font-serif font-bold">Attribution</h2>
          <p className="mt-4 leading-relaxed text-foreground/75">
            When permission is granted, credit the image to Pulock Deb Roy and link to the original media page where possible.
          </p>
        </section>
        <section className="mt-8 border-t border-border pt-8">
          <h2 className="text-2xl font-serif font-bold">Permission requests</h2>
          <p className="mt-4 leading-relaxed text-foreground/75">
            Contact Pulock Deb Roy through the contact section on the homepage for licensing or usage requests.
          </p>
          <Link href="/#contact" className="mt-4 inline-block text-primary underline-offset-4 hover:underline">
            Contact Pulock Deb Roy
          </Link>
        </section>
        <p className="mt-12 text-sm text-foreground/60">© Pulock Deb Roy. All rights reserved.</p>
      </article>
    </main>
  )
}
