import { Bot, GraduationCap, Rocket, Search } from 'lucide-react'

const activities = [
  {
    period: '2022–2026',
    icon: GraduationCap,
    eyebrow: 'Education',
    title: 'Computer Science & Engineering',
    organization: 'Leading University',
    detail: 'B.Sc. in Computer Science and Engineering',
  },
  {
    period: 'July 2025–Present',
    icon: Rocket,
    eyebrow: 'Ravenence Limited',
    title: 'Chief Marketing Officer',
    detail: 'Leading brand strategy, digital growth, AI-driven marketing, and business development.',
  },
  {
    period: 'Research & AI',
    icon: Search,
    eyebrow: 'Research & AI',
    title: 'AI and Machine Learning in Healthcare',
    detail: 'Advancing Diagnostics, Personalized Treatment, and Predictive Modeling',
  },
  {
    period: 'Ongoing',
    icon: Bot,
    eyebrow: 'Technology & Growth',
    title: 'Building scalable digital systems',
    detail: 'AI Automation · Growth Marketing · SEO · Digital Transformation',
  },
] as const

export function LifeActivitiesSection() {
  return (
    <section id="life-activities" className="py-20 md:py-28" aria-labelledby="life-activities-heading">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Life activities</p>
          <h2 id="life-activities-heading" className="mt-4 font-display text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground text-balance">
            A journey built around useful momentum.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A journey across technology, entrepreneurship, research, growth, and digital transformation.
          </p>
        </header>

        <div className="relative mt-12 md:mt-16">
          <div className="absolute bottom-6 left-[1.125rem] top-6 w-px bg-border md:left-1/2" aria-hidden="true" />
          <ol className="space-y-6 md:space-y-8">
            {activities.map((activity, index) => {
              const Icon = activity.icon
              const isRight = index % 2 === 1
              return (
                <li key={activity.period} className="relative md:grid md:grid-cols-2 md:gap-12">
                  <div className={`flex items-start gap-5 ${isRight ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}`}>
                    <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary ${isRight ? 'md:order-first' : 'md:order-last'}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <article className={`min-w-0 flex-1 rounded-[var(--radius-card)] bg-card p-6 transition-transform duration-300 hover:-translate-y-1 ${isRight ? '' : 'md:text-right'}`}>
                      <time className="font-mono text-xs uppercase tracking-[0.12em] text-primary">{activity.period}</time>
                      <p className="mt-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">{activity.eyebrow}</p>
                      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">{activity.title}</h3>
                      {activity.organization && <p className="mt-1 text-sm font-medium text-foreground/80">{activity.organization}</p>}
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activity.detail}</p>
                    </article>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
