import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customers', {
  state: () => ({
    customers: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCustomers() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/customers')
        this.customers = response.map(customer => ({
          ...customer,
          companyName: customer.company?.name || 'No Company'
        }))
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
        return {
          ...response,
          companyName: response.company?.name || 'No Company'
        }
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
          body: customer,
        })
        // Update the company with the new customer's ID
        if (response.companyId) {
          try {
            await $fetch(`/api/companies/${response.companyId}`, {
              method: 'PUT',
              body: {
                customerIds: [...(response.company?.customerIds || []), response.id]
              }
            })
          } catch (companyUpdateError) {
            console.error('Error updating company with new customer:', companyUpdateError)
            // Consider how to handle this error. You might want to:
            // - Rollback the customer creation
            // - Notify the user
            // - Retry the operation
            // For now, we'll just log it and continue
          }
        }
        this.customers.push({
          ...response,
          companyName: response.company?.name || 'No Company'
        })
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
          body: customer,
        })
        const index = this.customers.findIndex((c) => c.id === customer.id)
        if (index !== -1) {
          this.customers[index] = {
            ...response,
            companyName: response.company?.name || 'No Company'
          }
        }

        return response
      } catch (e) {
        console.error('Error updating customer:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async deleteCustomer(customer) {
      this.loading = true
      this.error = null
      
      try {
        await $fetch(`/api/customers/${customer.id}`, { method: 'DELETE' })
        this.customers = this.customers.filter((c) => c.id !== customer.id)
      } catch (e) {
        console.error(`Error deleting customer ${customer.id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
})