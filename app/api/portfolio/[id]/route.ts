import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const portfolio = await sql`
      SELECT id, title, description, image_url as "imageUrl", project_url as "projectUrl", technologies, order_index as "orderIndex", created_at as "createdAt", updated_at as "updatedAt"
      FROM portfolio
      WHERE id = ${id}
    `
    if (portfolio.length === 0) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }
    return NextResponse.json(portfolio[0])
  } catch (error) {
    console.error('[portfolio] GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch portfolio item' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const { title, description, imageUrl, projectUrl, technologies, orderIndex } = await request.json()

    const result = await sql`
      UPDATE portfolio
      SET
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        image_url = COALESCE(${imageUrl}, image_url),
        project_url = COALESCE(${projectUrl}, project_url),
        technologies = COALESCE(${technologies}, technologies),
        order_index = COALESCE(${orderIndex}, order_index),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, description, image_url as "imageUrl", project_url as "projectUrl", technologies, order_index as "orderIndex", created_at as "createdAt", updated_at as "updatedAt"
    `
    if (result.length === 0) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('[portfolio] PUT error:', error)
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const result = await sql`DELETE FROM portfolio WHERE id = ${id} RETURNING id`
    if (result.length === 0) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Portfolio item deleted successfully' })
  } catch (error) {
    console.error('[portfolio] DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 })
  }
}
