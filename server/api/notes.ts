import { prisma } from '~/server/utils/prisma'

async function getAllNotes() {
  try {
    const notes = await prisma.notes.findMany()
    return notes
  } catch (error) {
    console.error('Error fetching notes:', error)
    throw error
  }
}

export default eventHandler(async (event) => {
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      try {
        const noteId = getRouterParam(event, 'id')
        if (noteId) {
          // Get a single note
          const note = await prisma.note.findUnique({
            where: { id: parseInt(noteId) }
          })
          if (!note) {
            throw createError({
              statusCode: 404,
              statusMessage: 'Note not found',
            })
          }
          return note
        } else {
          // Get all notes
          const notes = await getAllNotes()
          return notes
        }
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
        const newNote = await prisma.note.create({
          data: {
            body: body.body,
            relatedCustomerIds: body.relatedCustomerIds,
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

    case 'PUT':
      try {
        const body = await readBody(event)
        const noteId = getRouterParam(event, 'id')
        
        if (!noteId) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Note ID is required',
          })
        }

        const updatedNote = await prisma.note.update({
          where: { id: parseInt(noteId) },
          data: {
            body: body.body,
            relatedCustomerIds: body.relatedCustomerIds,
          },
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
      try {
        const noteId = getRouterParam(event, 'id')
        
        if (!noteId) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Note ID is required',
          })
        }

        await prisma.note.delete({
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