import { defineStore } from 'pinia'

export const useInteractionStore = defineStore('interactions', {
  state: () => ({
    interactions: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchInteractions() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/interactions', { method: 'GET' })
        this.interactions = Array.isArray(response) ? response : response.data || []
      } catch (e) {
        console.error('Error fetching interactions:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async fetchInteraction(id) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch(`/api/interactions/${id}`, { method: 'GET' })
        return response
      } catch (e) {
        console.error(`Error fetching interaction ${id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async addInteraction(interaction) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/interactions', {
          method: 'POST',
          body: interaction
        })
        this.interactions.push(response)
        return response
      } catch (e) {
        console.error('Error adding interaction:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async updateInteraction(interaction) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch(`/api/interactions/${interaction.id}`, {
          method: 'PUT',
          body: interaction
        })
        const index = this.interactions.findIndex(n => n.id === interaction.id)
        if (index !== -1) {
          this.interactions[index] = response
        }
        return response
      } catch (e) {
        console.error('Error updating interaction:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async deleteInteraction(id) {
      this.loading = true
      this.error = null
      try {
        await $fetch(`/api/interactions/${id}`, { method: 'DELETE' })
        this.interactions = this.interactions.filter(n => n.id !== id)
      } catch (e) {
        console.error(`Error deleting interaction ${id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})