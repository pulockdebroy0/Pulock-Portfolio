import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

const defaults = {
  email: 'admin@pulockdebroy.live',
  whatsapp: '+8801739161076',
  whatsapp_url: 'https://wa.me/8801739161076',
  linkedin_name: 'Pulock Deb Roy',
  linkedin_url: 'https://linkedin.com/in/pulockdebroy',
}

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_info (
      id           SERIAL PRIMARY KEY,
      email        VARCHAR(255) NOT NULL DEFAULT 'admin@pulockdebroy.live',
      whatsapp     VARCHAR(50)  NOT NULL DEFAULT '+8801739161076',
      whatsapp_url VARCHAR(255) NOT NULL DEFAULT 'https://wa.me/8801739161076',
      linkedin_name VARCHAR(255) NOT NULL DEFAULT 'Pulock Deb Roy',
      linkedin_url  VARCHAR(255) NOT NULL DEFAULT 'https://linkedin.com/in/pulockdebroy',
      updated_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export async function GET() {
  try {
    await ensureTable()
    const rows = await sql`SELECT * FROM contact_info LIMIT 1`
    return NextResponse.json(rows.length > 0 ? rows[0] : defaults)
  } catch {
    return NextResponse.json(defaults)
  }
}

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { email, whatsapp, whatsapp_url, linkedin_name, linkedin_url } = await request.json()

    if (!email || !whatsapp || !whatsapp_url || !linkedin_name || !linkedin_url) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    await ensureTable()
    const existing = await sql`SELECT id FROM contact_info LIMIT 1`

    if (existing.length === 0) {
      await sql`
        INSERT INTO contact_info (email, whatsapp, whatsapp_url, linkedin_name, linkedin_url)
        VALUES (${email}, ${whatsapp}, ${whatsapp_url}, ${linkedin_name}, ${linkedin_url})
      `
    } else {
      await sql`
        UPDATE contact_info
        SET email        = ${email},
            whatsapp     = ${whatsapp},
            whatsapp_url = ${whatsapp_url},
            linkedin_name = ${linkedin_name},
            linkedin_url  = ${linkedin_url},
            updated_at   = NOW()
        WHERE id = ${existing[0].id}
      `
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[contact-info] PUT error:', error)
    return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 })
  }
}
