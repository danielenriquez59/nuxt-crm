import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const customerId = getRouterParam(event, 'id')

  if (!customerId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Customer ID is required',
    })
  }

  switch (method) {
    case 'GET':
      // Get a single customer
      try {
        const customer = await prisma.customers.findUnique({
          where: { id: customerId },
          include: {
            company: true,
            notes: true,
          },
        })
        if (!customer) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Customer not found',
          })
        }
        return customer
      } catch (error) {
        console.error('Error fetching customer:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }

    case 'PUT':
      // Update a customer
      try {
        const body = await readBody(event)

        // Prepare the update data
        const updateData = {
          name: body.name,
          email: body.email,
          status: body.status,
          companyId: body.companyId,
        }

        const updatedCustomer = await prisma.customers.update({
          where: { id: customerId },
          data: updateData,
          include: {
            company: true,
            notes: true,
          },
        })

        return updatedCustomer
      } catch (error) {
        console.error('Error updating customer:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to update customer',
        })
      }

    case 'DELETE':
      // Delete a customer
      try {
        await prisma.customers.delete({
          where: { id: customerId },
        })
        return { message: 'Customer deleted successfully' }
      } catch (error) {
        console.error('Error deleting customer:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to delete customer',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})
