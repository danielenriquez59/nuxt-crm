import { PrismaClient } from '@prisma/client'
import { eventHandler, getMethod, readBody, createError } from 'h3'

const prisma = new PrismaClient()

async function getAllCustomers() {
  try {
    const customers = await prisma.customers.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    return customers
  } catch (error) {
    console.error('Error fetching customers:', error)
    throw error
  }
}

export default eventHandler(async (event) => {
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      try {
        const customers = await getAllCustomers()

        return customers
      } catch (error) {
        console.error('Error fetching customers:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }

    case 'POST':
      try {
        const body = await readBody(event)
        const newCustomer = await prisma.customers.create({
          data: {
            name: body.name,
            email: body.email,
            status: body.status,
            company: {
              connect: { id: body.companyId },
            },
          },
          include: {
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        })
        return newCustomer
      } catch (error) {
        console.error('Error creating customer:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to create customer',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})
