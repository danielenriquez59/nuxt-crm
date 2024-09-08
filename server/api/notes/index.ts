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
        // sample return
        // notes: [ { id: 'cm0tv3m0m000piwnoi06oyj2b',
        //   body: 'Vorax inventore adimpleo validus voco.',
        //   createdAt: 2024-02-09T14:55:19.956Z,
        //   updatedAt: 2024-09-08T04:03:11.269Z,
        //   relatedCustomers: [ [Object], [Object], [Object] ] },

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
        const newNote = await prisma.notes.create({
          data: {
            body: body.body,
            relatedCustomers: body.relatedCustomers || [],
          },
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
