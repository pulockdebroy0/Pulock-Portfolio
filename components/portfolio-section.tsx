'use client'

import { useEffect, useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioItem } from '@/lib/types'

const easeOut = [0.16, 1, 0.3, 1] as const

export function PortfolioSection() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio')
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio: ${response.status}`)
        }
        const data = await response.json()
        setItems(Array.isArray(data) ? data : [])
        setError(null)
      } catch (err) {
        console.error('Error fetching portfolio:', err)
        setItems([])
        setError(err instanceof Error ? err.message : 'Failed to load portfolio')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <section id="portfolio" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          {/* Section head — left-biased, stacked */}
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground">
              Selected projects.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Web applications, AI tools, and digital experiences built to solve
              real problems.
            </p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-20" role="status" aria-label="Loading projects">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : error ? (
            <div className="mt-12 max-w-md rounded-[var(--radius-card)] bg-card p-7">
              <p className="font-semibold text-foreground">The project list didn&rsquo;t load.</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Refresh the page to try again.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="mt-12 max-w-md rounded-[var(--radius-card)] bg-card p-8">
              <p className="font-semibold text-foreground">No projects yet.</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                New work is published regularly &mdash; check back soon.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              {items.map((item, index) => {
                const techList = item.technologies
                  ? item.technologies.split(',').map((t: string) => t.trim())
                  : []

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, ease: easeOut, delay: (index % 2) * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="group overflow-hidden rounded-[var(--radius-card)] bg-card"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                      <Image
                        src={item.imageUrl || '/placeholder.svg'}
                        alt={item.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                      />
                      {item.category && (
                        <span className="absolute left-3.5 top-3.5 rounded-full bg-background/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-primary backdrop-blur-sm">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>

                      {techList.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {techList.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.projectUrl && (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-primary transition-colors duration-200 hover:text-foreground"
                        >
                          View project
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </motion.article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  )
}
