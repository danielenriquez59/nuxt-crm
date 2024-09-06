import { prisma } from '~/server/utils/prisma'

async function getAllinteractions() {
  try {
    const interactions = await prisma.interaction.findMany()
    return interactions
  } catch (error) {
    console.error('Error fetching interactions:', error)
    throw error
  }
}

export default eventHandler(async (event) => {
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      try {
        const interactionId = getRouterParam(event, 'id')
        if (interactionId) {
          // Get a single interaction
          const interaction = await prisma.interaction.findUnique({
            where: { id: parseInt(interactionId) },
          })
          if (!interaction) {
            throw createError({
              statusCode: 404,
              statusMessage: 'interaction not found',
            })
          }
          return interaction
        } else {
          // Get all interactions
          const interactions = await getAllinteractions()
          return interactions
        }
      } catch (error) {
        console.error('Error fetching interaction(s):', error)
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
        const newinteraction = await prisma.interaction.create({
          data: {
            body: body.body,
            relatedCustomerIds: body.relatedCustomerIds,
          },
        })
        return newinteraction
      } catch (error) {
        console.error('Error creating interaction:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to create interaction',
        })
      }

    case 'PUT':
      try {
        const body = await readBody(event)
        const interactionId = getRouterParam(event, 'id')

        if (!interactionId) {
          throw createError({
            statusCode: 400,
            statusMessage: 'interaction ID is required',
          })
        }

        const updatedinteraction = await prisma.interaction.update({
          where: { id: parseInt(interactionId) },
          data: {
            body: body.body,
            relatedCustomerIds: body.relatedCustomerIds,
          },
        })
        return updatedinteraction
      } catch (error) {
        console.error('Error updating interaction:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to update interaction',
        })
      }

    case 'DELETE':
      try {
        const interactionId = getRouterParam(event, 'id')

        if (!interactionId) {
          throw createError({
            statusCode: 400,
            statusMessage: 'interaction ID is required',
          })
        }

        await prisma.interaction.delete({
          where: { id: parseInt(interactionId) },
        })

        return { message: 'interaction deleted successfully' }
      } catch (error) {
        console.error('Error deleting interaction:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to delete interaction',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})
