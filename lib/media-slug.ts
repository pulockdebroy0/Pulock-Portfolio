import sql from '@/lib/db'

export function slugify(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 150) || 'media'
}

export async function createUniqueMediaSlug(title: string, excludeId?: string) {
  const base = slugify(title)
  const existing = await sql`
    SELECT slug FROM media
    WHERE slug = ${base} OR slug LIKE ${`${base}-%`}
    ${excludeId ? sql`AND id <> ${excludeId}` : sql``}
  `
  const used = new Set(existing.map((row: { slug: string }) => row.slug))
  if (!used.has(base)) return base

  let suffix = 2
  while (used.has(`${base}-${suffix}`)) suffix += 1
  return `${base}-${suffix}`
}
