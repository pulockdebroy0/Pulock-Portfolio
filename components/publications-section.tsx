'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import type { Publication } from '@/lib/types';

export default function PublicationsSection() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPublications() {
      try {
        const res = await fetch('/api/publications');
        if (!res.ok) throw new Error('Failed to fetch publications');
        const data = await res.json();
        setPublications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchPublications();
  }, []);

  function formatDate(dateString?: string | null): string {
    if (!dateString) return 'Recent';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return 'Recent';
    }
  }

  return (
    <section id="publications" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section head — left-biased, stacked */}
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground">
            Thoughts &amp; publications.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Deep dives on technology, design, and the intersection of creativity
            and code.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-12 flex items-center justify-center py-8" role="status" aria-label="Loading publications">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-12 max-w-md rounded-[var(--radius-card)] bg-card p-7">
            <p className="font-semibold text-foreground">The publication list didn&rsquo;t load.</p>
            <p className="mt-1.5 text-sm text-muted-foreground">Refresh the page to try again.</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && publications.length === 0 && (
          <div className="mt-12 max-w-md rounded-[var(--radius-card)] bg-card p-8">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <p className="mt-3 font-semibold text-foreground">No publications yet.</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              New writing is published here as it goes live.
            </p>
          </div>
        )}

        {/* List */}
        {!loading && !error && publications.length > 0 && (
          <div className="mt-12 max-w-3xl space-y-3">
            {publications.map((pub) => {
              const Wrapper = pub.link ? 'a' : 'div';
              const wrapperProps = pub.link
                ? { href: pub.link, target: '_blank', rel: 'noopener noreferrer' }
                : {};

              return (
                <Wrapper
                  key={pub.id}
                  {...wrapperProps}
                  className="group block rounded-[var(--radius-card)] bg-card p-6 transition-[transform,background-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:bg-secondary md:p-7"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {formatDate(pub.publicationDate)}
                    </span>
                    {pub.link && (
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                    )}
                  </div>

                  <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-foreground">
                    {pub.title}
                  </h3>

                  {pub.description && (
                    <p className="mt-2 line-clamp-2 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
                      {pub.description}
                    </p>
                  )}
                </Wrapper>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
