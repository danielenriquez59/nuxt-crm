import { defineStore } from 'pinia'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProjects() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/projects')
        this.projects = response.map((project) => ({
          ...project,
        }))
      } catch (e) {
        console.error('Error fetching projects:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async fetchProject(id) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch(`/api/projects/${id}`, { method: 'GET' })
        return {
          ...response,
        }
      } catch (e) {
        console.error(`Error fetching project ${id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async addProject(project) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/projects', {
          method: 'POST',
          body: project,
        })
        this.projects.push(response)
        return response
      } catch (e) {
        console.error('Error adding project:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async updateProject(project) {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch(`/api/projects/${project.id}`, {
          method: 'PUT',
          body: project,
        })
        const index = this.projects.findIndex((p) => p.id === project.id)
        if (index !== -1) {
          this.projects[index] = response
        }

        return response
      } catch (e) {
        console.error('Error updating project:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async deleteProject(item) {
      this.loading = true
      this.error = null

      try {
        await $fetch(`/api/projects/${item.id}`, { method: 'DELETE' })
        this.projects = this.projects.filter((p) => p.id !== item.id)
      } catch (e) {
        console.error(`Error deleting project ${item.id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
})
