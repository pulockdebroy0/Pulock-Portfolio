'use client'

import { motion } from 'framer-motion'
import { Code, Award, Target, Users } from 'lucide-react'

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] },
  viewport: { once: true, margin: '0px 0px -100px 0px' },
})

const expertise = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description:
      'Expert in building production-grade applications with Next.js, React, TypeScript, and PostgreSQL. 5+ years of experience architecting scalable web systems.',
  },
  {
    icon: Target,
    title: 'Product Strategy',
    description:
      'Co-founder with experience leading product development, market strategy, and business growth. Focus on building products that solve real problems.',
  },
  {
    icon: Award,
    title: 'Digital Architecture',
    description:
      'Specialized in designing AI automation systems, CRM integrations, and growth infrastructure that deliver measurable results.',
  },
  {
    icon: Users,
    title: 'Team Leadership',
    description:
      'Led development teams at Ravenence Limited, overseeing strategy, client delivery, and technical execution across multiple projects.',
  },
]

const credentials = [
  { label: 'Years of Experience', value: '5+' },
  { label: 'Projects Completed', value: '50+' },
  { label: 'Tech Stack Mastery', value: '12+' },
  { label: 'Team Members Led', value: '15+' },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-secondary bg-background/50 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...reveal(0)}
          className="mb-16"
        >
          <h2 className="font-display text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground">
            Expertise and experience.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            I bring over 5 years of hands-on experience building digital products, leading teams, and solving complex technical challenges. Every project is informed by real-world constraints and measurable outcomes.
          </p>
        </motion.div>

        <motion.div
          {...reveal(0.1)}
          className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {credentials.map((cred, idx) => (
            <div key={idx} className="rounded-lg border border-secondary bg-secondary/30 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary sm:text-3xl">{cred.value}</div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{cred.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...reveal(0.2)}
          className="grid gap-8 md:grid-cols-2"
        >
          {expertise.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                {...reveal(0.3 + idx * 0.1)}
                className="group rounded-xl border border-secondary bg-secondary/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-secondary/40"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          {...reveal(0.5)}
          className="mt-16 rounded-xl border border-secondary bg-gradient-to-br from-secondary/20 to-secondary/5 p-8 backdrop-blur-sm"
        >
          <h3 className="font-display text-xl font-bold text-foreground">Why work with me?</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <div>
                <p className="font-medium text-foreground">Proven Track Record</p>
                <p className="mt-1 text-sm text-muted-foreground">Built and scaled products used by hundreds of users with consistent quality and reliability.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <div>
                <p className="font-medium text-foreground">Strategic Thinking</p>
                <p className="mt-1 text-sm text-muted-foreground">Not just coding. I think about business outcomes, user experience, and long-term maintainability.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <div>
                <p className="font-medium text-foreground">Technical Leadership</p>
                <p className="mt-1 text-sm text-muted-foreground">Experience leading teams, mentoring developers, and making architectural decisions at scale.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <div>
                <p className="font-medium text-foreground">Continuous Learning</p>
                <p className="mt-1 text-sm text-muted-foreground">Stay current with modern web technologies, best practices, and industry trends to deliver cutting-edge solutions.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
