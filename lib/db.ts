import { neon } from '@neondatabase/serverless'

let sql: any = null

function initializeDB() {
  if (sql) return sql
  
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    // Return a mock for build time
    return () => Promise.resolve([])
  }
  
  sql = neon(dbUrl)
  return sql
}

export default initializeDB()
