import { prisma } from '~/server/utils/prisma'

async function getAllCustomers() {
  try {
    // This is where Prisma actually queries your Supabase database
    const customers = await prisma.customer.findMany()
    
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
        const customers = await getAllCustomers()
        
        return customers
      } catch (error) {
        console.error('Error fetching customers:', error)
        return createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }
    // You can add other HTTP methods here as needed
    // case 'POST':
    //   // Handle creating a new customer
    // case 'PUT':
    //   // Handle updating a customer
    // case 'DELETE':
    //   // Handle deleting a customer
    default:
      return createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})