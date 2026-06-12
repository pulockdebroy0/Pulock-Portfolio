import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const publication = await sql`
      SELECT id, title, description, image_url as "imageUrl", publication_url as "publicationUrl", publication_date as "publicationDate", order_index as "orderIndex", created_at as "createdAt", updated_at as "updatedAt"
      FROM publications
      WHERE id = ${id}
    `
    if (publication.length === 0) {
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 })
    }
    return NextResponse.json(publication[0])
  } catch (error) {
    console.error('[publications] GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch publication' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const { title, description, imageUrl, publicationUrl, publicationDate, orderIndex } = await request.json()

    const result = await sql`
      UPDATE publications
      SET
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        image_url = COALESCE(${imageUrl}, image_url),
        publication_url = COALESCE(${publicationUrl}, publication_url),
        publication_date = COALESCE(${publicationDate}, publication_date),
        order_index = COALESCE(${orderIndex}, order_index),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, description, image_url as "imageUrl", publication_url as "publicationUrl", publication_date as "publicationDate", order_index as "orderIndex", created_at as "createdAt", updated_at as "updatedAt"
    `
    if (result.length === 0) {
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 })
    }
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('[publications] PUT error:', error)
    return NextResponse.json({ error: 'Failed to update publication' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const result = await sql`DELETE FROM publications WHERE id = ${id} RETURNING id`
    if (result.length === 0) {
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Publication deleted successfully' })
  } catch (error) {
    console.error('[publications] DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete publication' }, { status: 500 })
  }
}
