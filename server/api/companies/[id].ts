import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const companyId = getRouterParam(event, 'id')

  if (!companyId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Company ID is required',
    })
  }

  switch (method) {
    case 'GET':
      // Get a single company
      try {
        const company = await prisma.companies.findUnique({
          where: { id: companyId },
          include: {
            customers: {
              select: {
                id: true,
                name: true,
                email: true,
                status: true,
              },
            },
          },
        })
        if (!company) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Company not found',
          })
        }
        return company
      } catch (error) {
        console.error('Error fetching company:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }

    case 'PUT':
      // Update a company
      try {
        const body = await readBody(event)

        // Prepare the update data
        const updateData = {
          name: body.name,
          city: body.city,
          country: body.country,
          employeeIds: body.employeeIds,
          isEvaluation: body.isEvaluation,
          websiteUrl: body.websiteUrl,
        }

        const updatedCompany = await prisma.companies.update({
          where: { id: companyId },
          data: updateData,
          include: {
            customers: {
              select: {
                id: true,
                name: true,
                email: true,
                status: true,
              },
            },
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
      // Delete a company
      try {
        // First, update all customers associated with this company to remove the company reference
        await prisma.customers.updateMany({
          where: { companyId: companyId },
          data: { companyId: null },
        })

        // Then delete the company
        await prisma.companies.delete({
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
