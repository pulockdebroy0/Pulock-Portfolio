import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import type { Media } from '@/lib/types'
import { createUniqueMediaSlug } from '@/lib/media-slug'

// GET all media
export async function GET() {
  try {
    const media = await sql`
      SELECT id, title, description, image_url as "imageUrl", alt_text as "altText", slug, featured, created_at as "createdAt", updated_at as "updatedAt"
      FROM media
      ORDER BY created_at DESC
    `
    return NextResponse.json(media)
  } catch (error) {
    console.error('[v0] Error fetching media:', error)
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

// POST new media
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { title, description, imageUrl, altText, featured } = data

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and image URL are required' },
        { status: 400 }
      )
    }

    const slug = await createUniqueMediaSlug(title)
    const result = await sql`
      INSERT INTO media (title, description, image_url, alt_text, slug, featured)
      VALUES (${title}, ${description || ''}, ${imageUrl}, ${altText || title}, ${slug}, ${featured || false})
      RETURNING id, title, description, image_url as "imageUrl", alt_text as "altText", slug, featured, created_at as "createdAt", updated_at as "updatedAt"
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating media:', error)
    return NextResponse.json({ error: 'Failed to create media' }, { status: 500 })
  }
}
