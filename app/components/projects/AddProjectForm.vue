<script setup>
const newProject = ref({
  name: '',
  description: '',
  companyId: '',
})

const { addProject, error } = useProjects()
const { companies, fetchCompanies } = useCompanies()
fetchCompanies()

const handleSubmit = () => {
  addNewProject(newProject.value)
  newProject.value = { name: '', description: '', companyId: '' }
}

const addNewProject = async (item) => {
  await addProject(item)
  errorHandler(error, 'project', 'added')
}

</script>

<template>
  <BaseAddCard title="Add New Project" icon="i-heroicons-briefcase" @submit="handleSubmit">
    <UFormGroup label="Project Name">
      <UInput v-model="newProject.name" required />
    </UFormGroup>
    <UFormGroup label="Description">
      <UTextarea v-model="newProject.description" />
    </UFormGroup>
    <UFormGroup label="Company">
      <USelect 
        v-model="newProject.companyId" 
        :options="companies.map(company => ({ label: company.name, value: company.id }))" 
        required
      />
    </UFormGroup>
    <template #actions>
      <UButton color="primary" type="submit">Add Project</UButton>
    </template>
  </BaseAddCard>
</template>