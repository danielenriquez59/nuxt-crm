import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customers', {
  state: () => ({
    customers: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCustomers() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/customers', { method: 'GET' })
        this.customers = Array.isArray(response) ? response : response.data || []
      } catch (e) {
        console.error('Error fetching customers:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async fetchCustomer(id) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch(`/api/customers/${id}`, { method: 'GET' })
        return response
      } catch (e) {
        console.error(`Error fetching customer ${id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async addCustomer(customer) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/customers', {
          method: 'POST',
          body: customer
        })
        this.customers.push(response)
        return response
      } catch (e) {
        console.error('Error adding customer:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async updateCustomer(customer) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch(`/api/customers/${customer.id}`, {
          method: 'PUT',
          body: customer
        })
        const index = this.customers.findIndex(c => c.id === customer.id)
        if (index !== -1) {
          this.customers[index] = response
        }
        return response
      } catch (e) {
        console.error('Error updating customer:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async deleteCustomer(id) {
      this.loading = true
      this.error = null
      try {
        await $fetch(`/api/customers/${id}`, { method: 'DELETE' })
        this.customers = this.customers.filter(c => c.id !== id)
      } catch (e) {
        console.error('Error deleting customer:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    getCustomerById: (state) => (id) => {
      return state.customers.find(customer => customer.id === id)
    }
  }
})