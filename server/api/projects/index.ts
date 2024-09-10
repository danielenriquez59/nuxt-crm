import { prisma } from '~/server/utils/prisma'

export default eventHandler(async (event) => {
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      try {
        // Get all projects
        const projects = await prisma.projects.findMany({
          include: {
            company: {
              select: {
                id: true,
                name: true,
              },
            },
            tasks: true,
          },
        })

        return projects

      } catch (error) {
        console.error('Error fetching project(s):', error)
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
        const projectData = {
          name: body.name,
          description: body.description,
          companyId: body.companyId,
        }

        const newProject = await prisma.projects.create({
          data: projectData,
          include: {
            company: {
              select: {
                id: true,
                name: true,
              },
            },
            tasks: true,
          },
        })
        
        return newProject

      } catch (error) {
        console.error('Error creating project:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to create project',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})