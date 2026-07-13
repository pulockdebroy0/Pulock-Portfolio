'use client'

import { motion, MotionConfig } from 'framer-motion'
import { Globe, Code } from 'lucide-react'

const easeOut = [0.16, 1, 0.3, 1] as const

const techStack = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Framer Motion',
  'Figma',
]

const roles = [
  { icon: Globe, title: 'CMO', detail: 'Ravenence Limited' },
  { icon: Code, title: 'Developer', detail: 'Full-stack & UI/UX' },
]

export function StorySection() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="story" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            {/* Left — the story */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="lg:col-span-7"
            >
              <h2 className="font-display text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground">
                Building products, not just features.
              </h2>

              <div className="mt-7 max-w-[60ch] space-y-5">
                <p className="text-base leading-relaxed text-muted-foreground">
                  I&rsquo;m Pulock Deb Roy. For over five years, I&rsquo;ve worked on everything
                  from full-stack Next.js applications to AI automation systems. What matters most is
                  shipping solutions that actually work &mdash; clean code, intentional design, real impact.
                </p>

                <p className="text-base leading-relaxed text-muted-foreground">
                  As Co-Founder and CMO of Ravenence Limited, I lead digital strategy and
                  product development. We&rsquo;re based in Sylhet, Bangladesh, and help businesses
                  scale with custom web applications, intelligent automation, and data-driven systems.
                  Every project starts with a clear problem we&rsquo;re solving.
                </p>
              </div>

              {/* Roles — inline, no card-in-card */}
              <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                {roles.map((role) => (
                  <div key={role.title} className="group flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-card text-primary transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-1">
                      <role.icon size={18} />
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold text-foreground">
                        {role.title}
                      </span>
                      <span className="block text-sm text-muted-foreground">{role.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — elevated stack panel */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.12 }}
              className="lg:col-span-5"
            >
              <div className="rounded-[var(--radius-card)] bg-card p-7 transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5 md:p-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Tech stack
                </h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-secondary px-3 py-1.5 text-xs text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="mt-9 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Currently working on
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Full-stack web applications, AI automation workflows, and growth
                  infrastructure for Ravenence clients. Real products solving real problems.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
