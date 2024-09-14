<script setup>
const props = defineProps({
  selected: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update-item', 'close'])
const editingItem = ref(null)

watch(
  () => props.selected,
  (newValue) => {
    if (newValue) {
      editingItem.value = { ...newValue }
    }
  },
  { immediate: true }
)

const closeModal = () => {
  emit('close')
}

const saveEditedItem = () => {
  emit('update-item', editingItem.value)
  closeModal()
}

// Task specific functions
const { projects, fetchProjects } = useProjects()

</script>

<template>
  <UModal :model-value="isOpen" @close="closeModal">
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Edit Task</h3>
      </template>
      <div v-if="editingItem" class="mt-2 space-y-4">
        <UFormGroup label="Task Name">
          <UInput v-model="editingItem.name" required />
        </UFormGroup>
        <UFormGroup label="Description">
          <UTextarea v-model="editingItem.description" rows="4" />
        </UFormGroup>
        <UFormGroup label="Project">
          <USelect
            v-model="editingItem.projectId"
            :options="projects.map(project => ({ label: project.name, value: project.id }))"
            required
          />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <UButton color="gray" @click="closeModal">Cancel</UButton>
          <UButton color="primary" @click="saveEditedItem">Save Changes</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>