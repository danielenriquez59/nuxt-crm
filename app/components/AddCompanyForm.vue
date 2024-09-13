<script setup>
const newCompany = ref({
  name: '',
  city: '',
  country: '',
  websiteUrl: '',
  isEvaluation: false,
  employeeIds: [],
})

const { addCompany } = useCompanyStore()
const { customers, fetchCustomers } = useCustomers()
const toast = useToast()

// Fetch customers to use as potential employees
fetchCustomers()

const handleSubmit = async () => {
  try {
    await addCompany(newCompany.value)
    toast.add({ title: 'Success', description: 'Company added successfully', color: 'green' })
    resetForm()
  } catch (error) {
    console.error('Error adding company:', error)
    toast.add({ title: 'Error', description: 'Failed to add company', color: 'red' })
  }
}

const resetForm = () => {
  newCompany.value = {
    name: '',
    city: '',
    country: '',
    websiteUrl: '',
    isEvaluation: false,
    employeeIds: [],
  }
}

const addEmployee = (employee) => {
  if (!newCompany.value.employeeIds.includes(employee.id)) {
    newCompany.value.employeeIds.push(employee.id)
  }
}

const removeEmployee = (index) => {
  newCompany.value.employeeIds.splice(index, 1)
}

</script>

<template>
  <BaseAddCard title="Add New Company" icon="i-heroicons-building-office" @submit="handleSubmit">
    <UFormGroup label="Company Name">
      <UInput v-model="newCompany.name" required />
    </UFormGroup>
    <UFormGroup label="City">
      <UInput v-model="newCompany.city" />
    </UFormGroup>
    <UFormGroup label="Country">
      <UInput v-model="newCompany.country" />
    </UFormGroup>
    <UFormGroup label="Website URL">
      <UInput v-model="newCompany.websiteUrl" />
    </UFormGroup>
    <UFormGroup label="Is Evaluation?" class="flex flex-row gap-2 items-center">
      <UCheckbox v-model="newCompany.isEvaluation" />
    </UFormGroup>
    <UFormGroup label="Employees">
      <div class="flex flex-row flex-wrap max-w-full gap-1">
        <div
          v-for="employeeId in newCompany.employeeIds"
          :key="employeeId"
          class="text-xs"
        >
          <UButton
            color="gray"
            variant="ghost"
            @click="removeEmployee(newCompany.employeeIds.indexOf(employeeId))"
            class="py-2 px-3 text-md bg-primary opacity-90 rounded-full"
          >
            {{ customers.find(c => c.id === employeeId)?.name || employeeId }}
          </UButton>
        </div>
      </div>
      <AutoDropdown
        :options="customers"
        placeholder="Add an employee..."
        option-attribute="name"
        @update:modelValue="addEmployee"
        class="mt-2"
      />
    </UFormGroup>
    <template #actions>
      <UButton color="primary" type="submit">Add Company</UButton>
    </template>
  </BaseAddCard>
</template>