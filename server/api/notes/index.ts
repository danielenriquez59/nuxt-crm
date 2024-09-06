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
        // Get all notes
        const notes = await getAllNotes()
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
            relatedCustomerIds: body.relatedCustomerIds || [],
          },
        })
        console.log("sucess creating note")
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
