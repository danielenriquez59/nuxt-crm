import { defineStore } from 'pinia'

export const useLogStore = defineStore('logs', {
  state: () => ({
    logs: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchLogs() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/logs')
        this.logs = response.map((log) => ({
          ...log,
        }))

      } catch (e) {
        console.error('Error fetching logs:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async fetchLog(id) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch(`/api/logs/${id}`, { method: 'GET' })
        return {
          ...response,
        }

      } catch (e) {
        console.error(`Error fetching log ${id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async addLog(log) {
      this.loading = true
      this.error = null
      try {

        const response = await $fetch('/api/logs', {
          method: 'POST',
          body: log,
        })
        
        const mappedResponse = {
          ...response,
        }
        this.logs.push(mappedResponse)

        return mappedResponse
      } catch (e) {
        console.error('Error adding log:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async updateLog(log) {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch(`/api/logs/${log.id}`, {
          method: 'PUT',
          body: log,
        })
        const index = this.logs.findIndex((l) => l.id === log.id)
        if (index !== -1) {
          this.logs[index] = response
        }

        return response
      } catch (e) {
        console.error('Error updating log:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async deleteLog(item) {
      this.loading = true
      this.error = null

      try {
        await $fetch(`/api/logs/${item.id}`, { method: 'DELETE' })
        this.logs = this.logs.filter((l) => l.id !== item.id)
      } catch (e) {
        console.error(`Error deleting log ${item.id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
})
