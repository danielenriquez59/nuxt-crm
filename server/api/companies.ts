import { prisma } from '~/server/utils/prisma'

async function getAllCompanies() {
  try {
    const companies = await prisma.company.findMany()
    return companies
  } catch (error) {
    console.error('Error fetching companies:', error)
    throw error
  }
}

export default eventHandler(async (event) => {
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      try {
        const companyId = getRouterParam(event, 'id')
        if (companyId) {
          // Get a single company
          const company = await prisma.company.findUnique({
            where: { id: companyId },
          })
          if (!company) {
            throw createError({
              statusCode: 404,
              statusMessage: 'Company not found',
            })
          }
          return company
        } else {
          // Get all companies
          const companies = await getAllCompanies()
          return companies
        }
      } catch (error) {
        console.error('Error fetching company(ies):', error)
        if (error.statusCode === 404) {
          throw error
        }
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }

    case 'POST':
      try {
        const body = await readBody(event)
        if (!body.name) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Name is required',
          })
        }
        const newCompany = await prisma.company.create({
          data: {
            name: body.name,
            city: body.city || '',
            country: body.country,
            employeeIds: body.employeeIds || [],
            isEvaluation: body.isEvaluation ?? false,
            websiteUrl: body.websiteUrl,
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

    case 'PUT':
      try {
        const body = await readBody(event)
        const companyId = getRouterParam(event, 'id')

        if (!companyId) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Company ID is required',
          })
        }

        const updatedCompany = await prisma.company.update({
          where: { id: companyId },
          data: {
            name: body.name,
            city: body.city,
            country: body.country,
            employeeIds: body.employeeIds,
            isEvaluation: body.isEvaluation,
            websiteUrl: body.websiteUrl,
            // Note: createdAt and updatedAt are handled automatically by Prisma
          },
        })
        return updatedCompany
      } catch (error) {
        console.error('Error updating company:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to update company',
        })
      }

    case 'DELETE':
      try {
        const companyId = getRouterParam(event, 'id')

        if (!companyId) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Company ID is required',
          })
        }

        await prisma.company.delete({
          where: { id: companyId },
        })

        return { message: 'Company deleted successfully' }
      } catch (error) {
        console.error('Error deleting company:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to delete company',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})
