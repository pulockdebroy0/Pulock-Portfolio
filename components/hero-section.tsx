'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, MotionConfig } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const easeOut = [0.16, 1, 0.3, 1] as const

const metrics = [
  { value: '5+', label: 'Years experience' },
  { value: '20+', label: 'Projects delivered' },
  { value: '100%', label: 'Client satisfaction' },
]

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.42, ease: easeOut, delay: i * 0.06 },
})

export function HeroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        {/* Atmospheric blooms — slow drift */}
        <div aria-hidden className="bloom bloom-drift -top-40 right-[-8%] h-[34rem] w-[34rem]" />
        <div aria-hidden className="bloom bloom-drift--slow bottom-[-12rem] left-[-10%] h-[26rem] w-[26rem] opacity-50" />

        {/* Ambient floating dots */}
        <div aria-hidden className="float-bob absolute left-[12%] top-[28%] h-2 w-2 rounded-full bg-primary/40" />
        <div aria-hidden className="float-bob--delayed absolute right-[40%] top-[18%] h-1.5 w-1.5 rounded-full bg-primary/30" />
        <div aria-hidden className="float-bob absolute right-[8%] bottom-[14%] h-2.5 w-2.5 rounded-full bg-primary/20" style={{ animationDelay: '-3.5s' }} />

        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            {/* Left — statement */}
            <div className="lg:col-span-7">
              <motion.p
                {...reveal(0)}
                className="font-mono text-xs uppercase tracking-[0.18em] text-primary"
              >
                Co-Founder & CMO · Ravenence Limited
              </motion.p>

              <motion.h1
                {...reveal(1)}
                className="mt-5 font-display text-[clamp(2.75rem,5vw+1rem,5.25rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground"
              >
                Full-stack builder focused on{' '}
                <span className="text-primary">real results.</span>
              </motion.h1>

              <motion.p
                {...reveal(2)}
                className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
              >
                Web developer and digital architect. I build scalable products,
                design intentional systems, and drive measurable growth for
                Ravenence Limited clients through strategy and code.
              </motion.p>

              <motion.div {...reveal(3)} className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  Start a project
                </Link>
                <Link
                  href="#portfolio"
                  className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary"
                >
                  View work
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>

              <motion.dl {...reveal(4)} className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <dd className="font-display text-3xl font-bold tracking-tight text-foreground tabular-nums">
                      {metric.value}
                    </dd>
                    <dt className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {metric.label}
                    </dt>
                  </div>
                ))}
              </motion.dl>
            </div>

            {/* Right — portrait with pulsing glow, rings + floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: easeOut, delay: 0.18 }}
              className="flex justify-center lg:col-span-5 lg:justify-end"
            >
              <div className="float-bob relative w-full max-w-[22rem]">
                {/* Pulsing glow behind portrait */}
                <div
                  aria-hidden
                  className="glow-pulse absolute -inset-8 rounded-full bg-primary/20 blur-3xl"
                />

                {/* Expanding accent rings */}
                <div
                  aria-hidden
                  className="ring-pulse absolute inset-0 rounded-[2rem] border border-primary/30"
                />
                <div
                  aria-hidden
                  className="ring-pulse--delayed absolute inset-0 rounded-[2rem] border border-primary/20"
                />

                <figure className="relative">
                  <div
                    aria-hidden
                    className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-primary/40"
                  />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-card">
                    <Image
                      src="/Pulock.jpeg"
                      alt="Pulock Deb Roy"
                      fill
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 1024px) 88vw, 22rem"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    <figcaption className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-foreground backdrop-blur-sm">
                      Pulock Deb Roy · Sylhet
                    </figcaption>
                  </div>
                </figure>

                {/* Floating "available" badge — jumps gently */}
                <div className="float-bob--delayed absolute -left-4 top-8 flex items-center gap-2 rounded-full border border-border bg-background/90 px-3.5 py-2 shadow-[0_8px_24px_-12px_oklch(0%_0_0/0.6)] backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="whitespace-nowrap text-xs font-medium text-foreground">
                    Available for work
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
