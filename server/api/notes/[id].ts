import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// function to add relatedCustomerNames to the note
async function addRelatedCustomerNames(note) {
  const relatedCustomerNames = await prisma.customers.findMany({
    where: { id: { in: note.relatedCustomers } },
    select: { name: true },
  })
  return { ...note, relatedCustomerNames: relatedCustomerNames.map((customer) => customer.name) }
}

export default eventHandler(async (event) => {
  const method = getMethod(event)
  const noteId = getRouterParam(event, 'id')

  if (!noteId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Note ID is required',
    })
  }

  switch (method) {
    case 'GET':
      // Get a single note
      try {
        const note = await prisma.notes.findUnique({
          where: { id: noteId },
        })
        if (!note) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Note not found',
          })
        }

        const noteWithRelatedCustomerNames = await addRelatedCustomerNames(note)
        return noteWithRelatedCustomerNames

      } catch (error) {
        console.error('Error fetching note:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }

    case 'PUT':
      // Update a note
      try {
        const body = await readBody(event)
        
        const updateData = {
          body: body.body,
          relatedCustomers: {
            set: body.relatedCustomers?.map(id => ({ id })) || []
          }
        }

        const updatedNote = await prisma.notes.update({
          where: { id: noteId },
          data: updateData,
          include: {
            relatedCustomers: true
          }
        })
       
        return updatedNote

      } catch (error) {
        console.error('Error updating note:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to update note',
        })
      }

    case 'DELETE':
      // Delete a note
      try {
        await prisma.notes.delete({
          where: { id: noteId },
        })
        return { message: 'Note deleted successfully' }
      } catch (error) {
        console.error('Error deleting note:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to delete note',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})
