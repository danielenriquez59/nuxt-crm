import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// function to add assigneeName to the task
async function addAssigneeName(task) {
  if (task.assigneeId) {
    const assignee = await prisma.users.findUnique({
      where: { id: task.assigneeId },
      select: { name: true },
    })
    return { ...task, assigneeName: assignee?.name }
  }
  return task
}

export default eventHandler(async (event) => {
  const method = getMethod(event)
  const taskId = getRouterParam(event, 'id')

  if (!taskId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Task ID is required',
    })
  }

  switch (method) {
    case 'GET':
      // Get a single task
      try {
        const task = await prisma.tasks.findUnique({
          where: { id: taskId },
        })
        if (!task) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Task not found',
          })
        }

        const taskWithAssigneeName = await addAssigneeName(task)
        return taskWithAssigneeName

      } catch (error) {
        console.error('Error fetching task:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        })
      }

    case 'PUT':
      // Update a task
      try {
        const body = await readBody(event)
        console.log('body', body)
        // Prepare the update data
        const updateData = {
          title: body.title,
          description: body.description,
          status: body.status,
          dueDate: body.dueDate,
          assigneeId: body.assigneeId,
          // Add other fields as necessary
        }

        const updatedTask = await prisma.tasks.update({
          where: { id: taskId },
          data: updateData,
        })
       
        const taskWithAssigneeName = await addAssigneeName(updatedTask)
        return taskWithAssigneeName

      } catch (error) {
        console.error('Error updating task:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to update task',
        })
      }

    case 'DELETE':
      // Delete a task
      try {
        await prisma.tasks.delete({
          where: { id: taskId },
        })
        return { message: 'Task deleted successfully' }
      } catch (error) {
        console.error('Error deleting task:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to delete task',
        })
      }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      })
  }
})