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

</script>

<template>
  <BaseAddCard title="Add New Customer" icon="i-heroicons-user" @submit="handleSubmit">
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
        required
      />
    </UFormGroup>
    <template #actions>
      <UButton color="primary" type="submit">Add Customer</UButton>
    </template>
  </BaseAddCard>
</template>