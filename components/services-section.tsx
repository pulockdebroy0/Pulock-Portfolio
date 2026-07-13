'use client'

import { motion, MotionConfig } from 'framer-motion'
import { Cpu, Terminal, Palette, Smartphone, Box } from 'lucide-react'

const easeOut = [0.16, 1, 0.3, 1] as const

const featured = {
  icon: Cpu,
  title: 'AI Automation Systems',
  description:
    'Intelligent automation that handles the work your team shouldn\'t have to. Custom pipelines, AI-powered workflows, and integration with your existing tools.',
  deliverables: [
    'Custom automation workflows',
    'AI-powered lead qualification',
    'Intelligent document processing',
    'CRM and email integration',
  ],
}

const services = [
  {
    icon: Terminal,
    title: 'Web Development',
    description:
      'Full-stack applications built with Next.js and React. Fast, scalable, SEO-optimized. PostgreSQL databases, serverless architecture, and clean code.',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description:
      'Cross-platform mobile apps that work. Built with React Native for consistent behavior across iOS and Android without compromise.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Interface design that drives conversion. From wireframes to design systems, focused on user needs and business outcomes.',
  },
  {
    icon: Box,
    title: '3D & Motion',
    description:
      'Interactive 3D experiences and motion graphics. Using Three.js and Framer Motion to add depth and polish to digital products.',
  },
]

const cardLift =
  'transition-[transform,background-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:bg-secondary'

export function ServicesSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="services" className="relative overflow-hidden py-20 md:py-24">
        <div aria-hidden className="bloom bloom-drift--slow right-[-12%] top-[10%] h-96 w-96 opacity-40" />

        <div className="relative mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground">
              Services and capabilities.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Strategy, design, and development. I deliver complete solutions,
              whether it&rsquo;s a website rebuild or an AI-powered system.
            </p>
          </motion.div>

          {/* Featured + 2×2 grid */}
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr]">
            {/* Featured — spans 2 rows */}
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
              className={`flex flex-col rounded-(--radius-card) bg-card p-8 lg:row-span-2 md:p-10 ${cardLift}`}
            >
              <div className="flex items-center gap-3.5">
                <featured.icon size={22} className="shrink-0 text-primary" />
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {featured.title}
                </h3>
              </div>
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
              <ul className="mt-8 space-y-3.5">
                {featured.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>

            {/* Four compact cards — fill cols 2 & 3 across 2 rows */}
            {services.map((service, i) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.1 + i * 0.07 }}
                className={`rounded-(--radius-card) bg-card p-7 ${cardLift}`}
              >
                <div className="flex items-center gap-3">
                  <service.icon size={19} className="shrink-0 text-primary" />
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
