import { prisma } from '~/server/utils/prisma'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    // First, fetch all table names from the public schema
    const schemaQuery = Prisma.sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `
    const tables = await prisma.$queryRaw<{ table_name: string }[]>(schemaQuery)

    const results = await Promise.all(
      tables
        .map(async ({ table_name }) => {
          if (!table_name.includes('_')) {
            const query = Prisma.sql`
          SELECT "updatedAt" 
          FROM ${Prisma.raw(`"${table_name}"`)};
        `
            const records = await prisma.$queryRaw(query)

            return {
              tableName: table_name,
              updatedAt: records.map((r: { updatedAt: Date }) => r.updatedAt),
            }
          }
          return null
        })
        .filter(Boolean)
    )
    return results
  } catch (error) {
    console.error('Error fetching updated_at timestamps:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
