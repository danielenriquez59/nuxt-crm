<script setup>
const newCustomer = ref({
  name: '',
  email: '',
  status: 'Pending',
  companyId: '',
})

const { addCustomer, error } = useCustomers()
const { companies, fetchCompanies } = useCompanyStore()
fetchCompanies()

const handleSubmit = async () => {
  if (!newCustomer.value.companyId) {
    toast.add({ title: 'Error', description: 'Please select a company', color: 'red' })
    return
  }

  try {
    await addCustomer(newCustomer.value)
    toast.add({ title: 'Success', description: 'Customer added successfully', color: 'green' })
    resetForm()
  } catch (error) {
    console.error('Error adding customer:', error)
    toast.add({ title: 'Error', description: 'Failed to add customer', color: 'red' })
  }
}

const resetForm = () => {
  newCustomer.value = {
    name: '',
    email: '',
    companyId: '',
    status: 'Pending',
  }
}

const isFormVisible = ref(true)

</script>

<template>
  <UCard :ui="{ header: {padding: 'p-2 sm:px-4'} }">
    <template #header>
      <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white flex flex-row justify-between">
        <div class="flex flex-row items-center justify-between w-full">
          <div class="flex flex-row items-center">
            <UIcon name="i-heroicons-user" class="mr-2" />
            Add New Person
          </div>
          <ToggleVisibility @toggle-visibility="isFormVisible = !isFormVisible" key="add-customer-form"/>
        </div>
      </h3>
    </template>
    <form v-if="isFormVisible" @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <UFormGroup label="Name">
          <UInput v-model="newCustomer.name" required />
        </UFormGroup>
        <UFormGroup label="Email">
          <UInput v-model="newCustomer.email" type="email" required />
        </UFormGroup>
        <UFormGroup label="Status">
          <USelect
            v-model="newCustomer.status"
            :options="statusOptions"
            required
          />
        </UFormGroup>
        <UFormGroup label="Company">
          <USelect
            v-model="newCustomer.companyId"
            :options="companies"
            option-attribute="name"
            value-attribute="id"
            placeholder="Select a company..."
          />
        </UFormGroup>
      </div>
      <div class="flex justify-end space-x-2 mt-3">
        <UButton color="primary" type="submit">Add Customer</UButton>
      </div>
    </form>
  </UCard>
</template>