import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/tasks')
        this.tasks = response.map((task) => ({
          ...task,
          projectName: task.project.name,
          companyName: task.project.company.name,
        }))
      } catch (e) {
        console.error('Error fetching tasks:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async fetchTask(id) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch(`/api/tasks/${id}`, { method: 'GET' })
        return {
          ...response,
          projectName: response.project.name,
          companyName: response.project.company.name,
        }
      } catch (e) {
        console.error(`Error fetching task ${id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async addTask(task) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/tasks', {
          method: 'POST',
          body: task,
        })
        this.tasks.push(response)
        return response
      } catch (e) {
        console.error('Error adding task:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async updateTask(task) {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch(`/api/tasks/${task.id}`, {
          method: 'PUT',
          body: task,
        })
        const index = this.tasks.findIndex((t) => t.id === task.id)
        if (index !== -1) {
          this.tasks[index] = response
        }

        return response
      } catch (e) {
        console.error('Error updating task:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async deleteTask(item) {
      this.loading = true
      this.error = null

      try {
        await $fetch(`/api/tasks/${item.id}`, { method: 'DELETE' })
        this.tasks = this.tasks.filter((t) => t.id !== item.id)
      } catch (e) {
        console.error(`Error deleting task ${item.id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
})
