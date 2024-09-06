import { defineStore } from 'pinia'

export const useNoteStore = defineStore('notes', {
  state: () => ({
    notes: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchNotes() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/notes', { method: 'GET' })
        this.notes = Array.isArray(response) ? response : response.data || []
      } catch (e) {
        console.error('Error fetching notes:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async fetchNote(id) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch(`/api/notes/${id}`, { method: 'GET' })
        return response
      } catch (e) {
        console.error(`Error fetching note ${id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async addNote(note) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/notes', {
          method: 'POST',
          body: note,
        })
        this.notes.push(response)
        return response
      } catch (e) {
        console.error('Error adding note:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async updateNote(note) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch(`/api/notes/${note.id}`, {
          method: 'PUT',
          body: note,
        })
        const index = this.notes.findIndex((n) => n.id === note.id)
        if (index !== -1) {
          this.notes[index] = response
        }
        return response
      } catch (e) {
        console.error('Error updating note:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async deleteNote(id) {
      this.loading = true
      this.error = null
      try {
        await $fetch(`/api/notes/${id}`, { method: 'DELETE' })
        this.notes = this.notes.filter((n) => n.id !== id)
      } catch (e) {
        console.error(`Error deleting note ${id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
})
