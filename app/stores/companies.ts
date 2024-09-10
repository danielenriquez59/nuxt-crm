import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('companies', {
  state: () => ({
    companies: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCompanies() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/companies')
        this.companies = response.map(company => ({
          ...company,
          employeeIds: company.employeeIds || [],
        }))
        
      } catch (e) {
        console.error('Error fetching companies:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async fetchCompany(id) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch(`/api/companies/${id}`, { method: 'GET' })
        return response
      } catch (e) {
        console.error(`Error fetching company ${id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async addCompany(company) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/companies', {
          method: 'POST',
          body: company,
        })
        this.companies.push(response)
        return response
      } catch (e) {
        console.error('Error adding company:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async updateCompany(company) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $fetch(`/api/companies/${company.id}`, {
          method: 'PUT',
          body: company,
        })
        const index = this.companies.findIndex((c) => c.id === company.id)
        if (index !== -1) {
          this.companies[index] = response
        }

        return response
      } catch (e) {
        console.error('Error updating company:', e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async deleteCompany(company) {
      this.loading = true
      this.error = null
      
      try {
        await $fetch(`/api/companies/${company.id}`, { method: 'DELETE' })
        this.companies = this.companies.filter((c) => c.id !== company.id)
      } catch (e) {
        console.error(`Error deleting company ${company.id}:`, e)
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
})