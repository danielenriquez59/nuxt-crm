import { prisma } from '~/server/utils/prisma'

async function getAllCustomers() {
  try {
    // This is where Prisma actually queries your Supabase database
    const customers = await prisma.customers.findMany()

    return customers
  } catch (error) {
    console.error('Error fetching customers:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

export default eventHandler(async (event) => {
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      try {
        const customerId = getRouterParam(event, 'id')
        if (customerId) {
          // Get a single customer
          const customer = await prisma.customers.findUnique({
            where: { id: parseInt(customerId) },
          })
          if (!customer) {
            throw createError({
              statusCode: 404,
              statusMessage: 'Customer not found',
            })
          }
          return customer
        } else {
          // Get all customers
          const customers = await getAllCustomers()
          return customers
        }
      } catch (error) {
        console.error('Error fetching customer(s):', error)
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
        const newCustomer = await prisma.customer.create({
          data: {
            companyId: body.companyId,
            email: body.email,
            name: body.name,
            status: body.status,
          },
        })
        return newCustomer
      } catch (error) {
        console.error('Error creating customer:', error)
        return createError({
          statusCode: 500,
          statusMessage: 'Failed to create customer',
        })
      }

    case 'PUT':
      //   Handle updating a customer
      try {
        const body = await readBody(event)
        const customerId = getRouterParam(event, 'id')

        if (!customerId) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Customer ID is required',
          })
        }

        const updatedCustomer = await prisma.customers.update({
          where: { id: parseInt(customerId) },
          data: {
            companyId: body.companyId,
            email: body.email,
            name: body.name,
            status: body.status,
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
      // Handle deleting a customer
      try {
        const customerId = getRouterParam(event, 'id')

        if (!customerId) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Customer ID is required',
          })
        }

        await prisma.customers.delete({
          where: { id: parseInt(customerId) },
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
      return createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})
