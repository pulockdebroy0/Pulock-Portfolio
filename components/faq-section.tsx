'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What services does Pulock Deb Roy offer?',
    answer:
      'Pulock offers full-stack web development, AI automation systems, UI/UX design, and digital strategy consulting. He specializes in Next.js and React applications with PostgreSQL backends, custom automation workflows, and scalable digital infrastructure for businesses looking to grow.',
  },
  {
    question: 'What technologies does Pulock use?',
    answer:
      'Primary tech stack includes Next.js, React, TypeScript, PostgreSQL, Tailwind CSS, and Node.js for backend services. He also works with AI automation tools, CRM platforms, and modern DevOps practices. All projects are built with scalability, performance, and maintainability in mind.',
  },
  {
    question: 'How much experience does Pulock have?',
    answer:
      'Pulock has 5+ years of professional experience in web development and product strategy. He has successfully completed 50+ projects ranging from startup MVPs to enterprise-scale applications. Currently serves as Co-Founder & CMO at Ravenence Limited.',
  },
  {
    question: 'What is Ravenence Limited?',
    answer:
      'Ravenence Limited is a government-registered IT firm based in Sylhet, Bangladesh. Founded by Pulock Deb Roy and co-founders, it specializes in custom web applications, AI automation, digital transformation, and growth infrastructure for businesses worldwide.',
  },
  {
    question: 'Does Pulock work on existing projects or only new builds?',
    answer:
      'Pulock works on both new projects and existing codebases. He can help with feature development, performance optimization, technical refactoring, and scaling applications. He has experience with legacy systems and modern frameworks.',
  },
  {
    question: 'What is the typical project timeline?',
    answer:
      'Project timelines vary based on scope and complexity. MVP projects typically take 6-12 weeks, while larger applications may take 3-6 months. Pulock works in sprints with clear deliverables and maintains regular communication with clients.',
  },
  {
    question: 'Can Pulock help with AI automation?',
    answer:
      'Yes, automation and AI integration is a core service. Pulock specializes in building intelligent workflows, chatbots, lead qualification systems, email automation, and integrating AI services into existing applications to improve efficiency.',
  },
  {
    question: 'How can I contact Pulock?',
    answer:
      'You can reach out via email at pulock@ravenence.com, WhatsApp at +88-01739-161076, or connect on LinkedIn at linkedin.com/in/pulock-deb-roy-833584218. Response time is typically within 24 hours.',
  },
]

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] },
  viewport: { once: true, margin: '0px 0px -100px 0px' },
})

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-hidden border-t border-secondary bg-background/50 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...reveal(0)} className="mb-16 max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground">
            Frequently asked questions.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Common questions about services, experience, and how to work together. Can&apos;t find what you&apos;re looking for? Reach out directly.
          </p>
        </motion.div>

        <motion.div {...reveal(0.1)} className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="group rounded-lg border border-secondary bg-secondary/20 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-secondary/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 text-left"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-content-${idx}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display font-semibold text-foreground">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ${
                      openIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    id={`faq-content-${idx}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-secondary px-6 py-4">
                      <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
