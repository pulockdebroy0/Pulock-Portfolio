import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET() {
  try {
    const publications = await sql`
      SELECT id, title, description, image_url as "imageUrl", publication_url as "publicationUrl", publication_date as "publicationDate", order_index as "orderIndex", created_at as "createdAt", updated_at as "updatedAt"
      FROM publications
      ORDER BY order_index ASC, publication_date DESC
    `
    return NextResponse.json(publications)
  } catch (error) {
    console.error('[v0] Publications fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch publications' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { title, description, imageUrl, publicationUrl, publicationDate, orderIndex } = data

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: title and description' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO publications (title, description, image_url, publication_url, publication_date, order_index)
      VALUES (${title}, ${description}, ${imageUrl || null}, ${publicationUrl || null}, ${publicationDate || null}, ${orderIndex || 0})
      RETURNING id, title, description, image_url as "imageUrl", publication_url as "publicationUrl", publication_date as "publicationDate", order_index as "orderIndex", created_at as "createdAt", updated_at as "updatedAt"
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('[v0] Publication creation error:', error)
    return NextResponse.json({ error: 'Failed to create publication' }, { status: 500 })
  }
}
