import { prisma } from '~/server/utils/prisma'

export default eventHandler(async (event) => {
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      try {
        // Get all tasks
        const tasks = await prisma.tasks.findMany({
          include: {
            project: {
              select: {
                id: true,
                name: true,
                company: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        })

        return tasks

      } catch (error) {
        console.error('Error fetching task(s):', error)
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
        const taskData = {
          name: body.name,
          description: body.description,
          project: {
            connect: { id: body.projectId }
          }
        }

        const newTask = await prisma.tasks.create({
          data: taskData,
          include: {
            project: {
              include: {
                company: true
              }
            }
          }
        })
        
        return newTask

      } catch (error) {
        console.error('Error creating task:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to create task',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})