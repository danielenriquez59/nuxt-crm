<script setup>
const props = defineProps({
  selected: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update-item', 'close'])

const editedProject = ref({ ...props.selected })
const { companies, fetchCompanies } = useCompanies()
fetchCompanies()

watch(() => props.selected, (newValue) => {
  editedProject.value = { ...newValue }
})

const handleSubmit = () => {
  emit('update-item', editedProject.value)
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <UModal :open="isOpen" @close="handleClose">
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          Edit Project
        </h3>
      </template>
      <form @submit.prevent="handleSubmit">
        <UFormGroup label="Project Name">
          <UInput v-model="editedProject.name" required />
        </UFormGroup>
        <UFormGroup label="Description">
          <UTextarea v-model="editedProject.description" />
        </UFormGroup>
        <UFormGroup label="Company">
          <USelect
            v-model="editedProject.companyId"
            :options="companies.map(company => ({ label: company.name, value: company.id }))"
            required
          />
        </UFormGroup>
        <div class="flex justify-end space-x-2 mt-4">
          <UButton color="gray" @click="handleClose">Cancel</UButton>
          <UButton color="primary" type="submit">Update Project</UButton>
        </div>
      </form>
    </UCard>
  </UModal>
</template>