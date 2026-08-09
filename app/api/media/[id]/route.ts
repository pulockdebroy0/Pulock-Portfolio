import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json()
    const { title, description, imageUrl, altText, featured } = data
    const { id } = await params

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and image URL are required' },
        { status: 400 }
      )
    }

    const result = await sql`
      UPDATE media
      SET title = ${title}, description = ${description || ''}, image_url = ${imageUrl}, alt_text = ${altText || title}, featured = ${featured || false}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, description, image_url as "imageUrl", alt_text as "altText", featured, created_at as "createdAt", updated_at as "updatedAt"
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('[v0] Error updating media:', error)
    return NextResponse.json({ error: 'Failed to update media' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const result = await sql`
      DELETE FROM media
      WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Media deleted successfully' })
  } catch (error) {
    console.error('[v0] Error deleting media:', error)
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 })
  }
}
