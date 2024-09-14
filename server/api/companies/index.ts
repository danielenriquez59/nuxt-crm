import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      try {
        // Get all companies
        const companies = await prisma.companies.findMany({
          include: {
            customers: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        })
        
        return companies
      } catch (error) {
        console.error('Error fetching company(ies):', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }

    case 'POST':
      try {
        const body = await readBody(event)

        // Prepare the data for Prisma
        const companyData = {
          name: body.name,
          city: body.city,
          country: body.country,
          employeeIds: body.employeeIds || [],
          isEvaluation: body.isEvaluation || false,
          websiteUrl: body.websiteUrl,
        }

        const newCompany = await prisma.companies.create({
          data: companyData,
          include: {
            customers: true,
          },
        })

        return newCompany
      } catch (error) {
        console.error('Error creating company:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to create company',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})
