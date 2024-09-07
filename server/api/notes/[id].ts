import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
        return note
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
        const { relatedCustomerIds, ...otherData } = body

        const updateData: any = { ...otherData }

        if (relatedCustomerIds !== undefined) {
          updateData.relatedCustomerIds = {
            set: Array.isArray(relatedCustomerIds)
              ? relatedCustomerIds.map(id => ({ id: id.toString() }))
              : []
          }
        }

        const updatedNote = await prisma.notes.update({
          where: { id: noteId },
          data: updateData,
          include: {
            relatedCustomerIds: true
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
          where: { id: parseInt(noteId) },
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