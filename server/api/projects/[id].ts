import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to add company name to the project
async function addCompanyName(project) {
  const company = await prisma.companies.findUnique({
    where: { id: project.companyId },
    select: { name: true },
  })
  return { ...project, companyName: company?.name }
}

export default eventHandler(async (event) => {
  const method = getMethod(event)
  const projectId = getRouterParam(event, 'id')

  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project ID is required',
    })
  }

  switch (method) {
    case 'GET':
      // Get a single project
      try {
        const project = await prisma.projects.findUnique({
          where: { id: projectId },
        })
        if (!project) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Project not found',
          })
        }

        const projectWithCompanyName = await addCompanyName(project)
        return projectWithCompanyName
      } catch (error) {
        console.error('Error fetching project:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }

    case 'PUT':
      // Update a project
      try {
        const body = await readBody(event)
        console.log('body', body)
        // Prepare the update data
        const updateData = {
          name: body.name,
          description: body.description,
          status: body.status,
          companyId: body.companyId,
          // Add other fields as necessary
        }

        const updatedProject = await prisma.projects.update({
          where: { id: projectId },
          data: updateData,
        })

        return updatedProject
      } catch (error) {
        console.error('Error updating project:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to update project',
        })
      }

    case 'DELETE':
      // Delete a project
      try {
        await prisma.projects.delete({
          where: { id: projectId },
        })
        return { message: 'Project deleted successfully' }
      } catch (error) {
        console.error('Error deleting project:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to delete project',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})
