import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {

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
        // Check if response is an array or has a data property
        this.customers = Array.isArray(response) ? response : response.data || []

      } catch (e) {
        console.error('Error fetching customers:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    addCustomer(customer) {
      this.customers.push(customer)
    },

    updateCustomer(updatedCustomer) {
      const index = this.customers.findIndex(c => c.id === updatedCustomer.id)
      if (index !== -1) {
        this.customers[index] = updatedCustomer
      }
    },

    deleteCustomer(customerId) {
      this.customers = this.customers.filter(c => c.id !== customerId)
    }
  },

  getters: {
    getCustomerById: (state) => (id) => {
      return state.customers.find(customer => customer.id === id)
    }
  }
})