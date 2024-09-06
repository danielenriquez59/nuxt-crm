import { useCustomerStore } from '~/stores/customers'
import { storeToRefs } from 'pinia'

export const useCustomers = () => {
  const store = useCustomerStore()
  const { customers, loading, error } = storeToRefs(store)

  const fetchCustomers = async () => {
    await store.fetchCustomers()
  }

  const addCustomer = (customer) => {
    store.addCustomer(customer)
  }

  const updateCustomer = (customer) => {
    store.updateCustomer(customer)
  }

  const deleteCustomer = (customerId) => {
    store.deleteCustomer(customerId)
  }

  const getCustomerById = (id) => {
    return store.getCustomerById(id)
  }

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
  }
}
