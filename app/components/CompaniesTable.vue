<script setup>
const EditCompany = defineAsyncComponent(() => import('~/components/EditCompany.vue'))

const toast = useToast()

const companyStore = useCompanyStore()
const { companies, loading, error } = storeToRefs(companyStore)
const { fetchCompanies, addCompany, updateCompany, deleteCompany } = companyStore

fetchCompanies()

// Refs for EditCompany and AddCompany functionality
const isEditCompanyOpen = ref(false)
const isAddCompanyOpen = ref(false)
const selectedForEdit = ref(null)

// Table columns definition
const columns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'city',
    label: 'City',
    sortable: true,
  },
  {
    key: 'country',
    label: 'Country',
    sortable: true,
  },
  {
    key: 'websiteUrl',
    label: 'Website',
    sortable: true,
  },
  {
    key: 'isEvaluation',
    label: 'Evaluation',
    sortable: true,
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    sortable: true,
  },
  {
    key: 'employeeIds',
    label: 'Employees',
    sortable: true,
  },
]

const rows = computed(() => {
  if (!Array.isArray(companies.value)) {
    return []
  }

  return companies.value.map((company) => ({
    ...company,
    updatedAt: company.updatedAt ? new Date(company.updatedAt).toLocaleString() : '',
    createdAt: company.createdAt ? new Date(company.createdAt).toLocaleString() : '',
  }))
})

const handleDeleteItem = async (item) => {
  try {
    await deleteCompany(item)
    toast.add({
      title: 'Success',
      message: 'Company deleted successfully',
      color: 'green',
    })
  } catch (error) {
    console.error('Error deleting company:', error)
    toast.add({
      title: 'Error',
      message: 'Failed to delete company',
      color: 'red',
    })
  }
}

const handleUpdateItem = async (item) => {
  try {
    await updateCompany(item)
    isEditCompanyOpen.value = false
    selectedForEdit.value = null
    toast.add({
      title: 'Success',
      message: 'Company updated successfully',
      color: 'green',
    })
  } catch (error) {
    console.error('Error updating company:', error)
    toast.add({
      title: 'Error',
      message: 'Failed to update company',
      color: 'red',
    })
  }
}

const openEditModal = (item) => {
  selectedForEdit.value = { ...item }
  isEditCompanyOpen.value = true
}

const closeEditCompany = () => {
  isEditCompanyOpen.value = false
  selectedForEdit.value = null
}

const handleAddCompany = async (newCompany) => {
  try {
    await addCompany(newCompany)
    isAddCompanyOpen.value = false
    toast.add({
      title: 'Success',
      message: 'Company added successfully',
      color: 'green',
    })
  } catch (error) {
    console.error('Error adding company:', error)
    toast.add({
      title: 'Error',
      message: 'Failed to add company',
      color: 'red',
    })
  }
}
</script>

<template>
  <div>
    <BaseTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
      @delete-item="handleDeleteItem"
      @update-item="openEditModal"
      type="companies"
    >
      <template #header>
        <h2>Companies</h2>
      </template>
      <template #loading-text>
        <p class="ml-2">Loading companies...</p>
      </template>
      <template #empty-text>
        <p class="ml-2">No companies found.</p>
      </template>
    </BaseTable>

    <EditCompany
      v-if="isEditCompanyOpen"
      :selected="selectedForEdit"
      :is-open="isEditCompanyOpen"
      @update-item="handleUpdateItem"
      @close="closeEditCompany"
    />
  </div>
</template>
