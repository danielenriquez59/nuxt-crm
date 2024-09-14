import { useCompanyStore } from '~/stores/companies'
import { storeToRefs } from 'pinia'

export const useCompanies = () => {
  const store = useCompanyStore()
  const { companies, loading, error } = storeToRefs(store)
  
  const fetchCompanies = async () => {
    await store.fetchCompanies()
  }

  const addCompany = (company) => {
    store.addCompany(company)
  }

  const updateCompany = (company) => {
    store.updateCompany(company)
  }

  const deleteCompany = (companyId) => {
    store.deleteCompany(companyId)
  }

  const getCompanyById = (id) => {
    return store.getCompanyById(id)
  }

  return {
    companies,
    loading,
    error,
    fetchCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
    getCompanyById,
  }
}
