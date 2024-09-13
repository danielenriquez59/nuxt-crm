<script setup>
const toast = useToast()

const { customers, loading, error, fetchCustomers, addCustomer, updateCustomer, deleteCustomer } = useCustomers()
fetchCustomers()

// Refs for EditCustomer and AddCustomer functionality
const isEditCustomerOpen = ref(false)
const isAddCustomerOpen = ref(false)
const selectedForEdit = ref(null)

// Table columns definition
const columns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
  },
  {
    key: 'companyName',
    label: 'Company',
    sortable: true,
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    sortable: true,
  },
]

const rows = computed(() => {
  if (!Array.isArray(customers.value)) {
    return []
  }

  return customers.value.map(customer => ({
    ...customer,
    companyName: customer.company?.name || '',
    updatedAt: customer.updatedAt ? new Date(customer.updatedAt).toLocaleString() : '',
    createdAt: customer.createdAt ? new Date(customer.createdAt).toLocaleString() : '',
  }))
})

const handleDeleteItem = async (item) => {
  try {
    await deleteCustomer(item)
    toast.add({
      title: 'Success',
      message: 'Customer deleted successfully',
      color: 'green'
    })
  } catch (error) {
    console.error('Error deleting customer:', error)
    toast.add({
      title: 'Error',
      message: 'Failed to delete customer',
      color: 'red'
    })
  }
}

const handleUpdateItem = async (item) => {
  try {
    await updateCustomer(item)
    isEditCustomerOpen.value = false
    selectedForEdit.value = null
    toast.add({
      title: 'Success',
      message: 'Customer updated successfully',
      color: 'green'
    })
  } catch (error) {
    console.error('Error updating customer:', error)
    toast.add({
      title: 'Error',
      message: 'Failed to update customer',
      color: 'red'
    })
  }
}

const openEditModal = (item) => {
  selectedForEdit.value = { ...item }
  isEditCustomerOpen.value = true
}

const closeEditCustomer = () => {
  isEditCustomerOpen.value = false
  selectedForEdit.value = null
}

</script>

<template>
  <div>
    <BaseTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
      v-model="page"
      @delete-item="handleDeleteItem"
      @update-item="openEditModal"
      type="customers"
    >
      <template #header>
        <h2>Customers</h2>
      </template>
      <template #loading-text>
        <p class="ml-2">Loading customers...</p>
      </template>
      <template #empty-text>
        <p class="ml-2">No customers found.</p>
      </template>
    </BaseTable>

    <EditCustomer
      v-if="isEditCustomerOpen"
      :selected="selectedForEdit"
      :is-open="isEditCustomerOpen"
      @update-item="handleUpdateItem"
      @close="closeEditCustomer"
    />

  </div>
</template>