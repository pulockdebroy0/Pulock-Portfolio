import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET() {
  try {
    const portfolio = await sql`
      SELECT id, title, description, image_url as "imageUrl", project_url as "projectUrl", technologies, order_index as "orderIndex", created_at as "createdAt", updated_at as "updatedAt"
      FROM portfolio
      ORDER BY order_index ASC, created_at DESC
    `
    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('[v0] Portfolio fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { title, description, imageUrl, projectUrl, technologies, orderIndex } = data

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: title and description' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO portfolio (title, description, image_url, project_url, technologies, order_index)
      VALUES (${title}, ${description}, ${imageUrl || null}, ${projectUrl || null}, ${technologies || null}, ${orderIndex || 0})
      RETURNING id, title, description, image_url as "imageUrl", project_url as "projectUrl", technologies, order_index as "orderIndex", created_at as "createdAt", updated_at as "updatedAt"
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('[v0] Portfolio creation error:', error)
    return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 })
  }
}
