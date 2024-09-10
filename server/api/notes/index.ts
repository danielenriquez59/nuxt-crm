import { prisma } from '~/server/utils/prisma'

export default eventHandler(async (event) => {
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      try {
        // Get all notes
        const notes = await prisma.notes.findMany({
          include: {
            relatedCustomers: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        })

        return notes

      } catch (error) {
        console.error('Error fetching note(s):', error)
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
          
          // Prepare the data for Prisma
          const noteData = {
            body: body.body,
            contact_method: body.contact_method,
            relatedCustomers: {
              connect: body.relatedCustomers.map(customer => ({ id: customer.id }))
            }
          }
  
          const newNote = await prisma.notes.create({
            data: noteData,
            include: {
              relatedCustomers: true
            }
          })
          
          return newNote

      } catch (error) {
        console.error('Error creating note:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to create note',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})
