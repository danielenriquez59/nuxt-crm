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

// generic const and functions
const emit = defineEmits(['update-item', 'close'])
const editingItem = ref(null)
watch(() => props.selected, (newValue) => {
  if (newValue) {
    editingItem.value = { ...newValue }
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const saveEditedItem = () => {
  emit('update-item', editingItem.value)
  closeModal()
}

// log specific functions
const { projects, fetchProjects } = useProjects()
const { tasks, fetchTasks } = useTasks()
fetchProjects()
fetchTasks()

const updateProject = (project) => {
  editingItem.value.projectId = project.id
  editingItem.value.projectName = project.name
  // Reset task when project changes
  editingItem.value.taskId = null
  editingItem.value.taskName = ''
}

const updateTask = (task) => {
  editingItem.value.taskId = task.id
  editingItem.value.taskName = task.name
}

// Function to format seconds to HH:MM:SS
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Function to parse HH:MM:SS to seconds
const parseTime = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}
</script>

<template>
  <UModal :model-value="isOpen" @close="closeModal">
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Edit Log</h3>
      </template>
      <div v-if="editingItem" class="mt-2 space-y-4">
        <UFormGroup label="Project">
          <AutoDropdown
            :options="projects"
            :modelValue="editingItem.projectName"
            placeholder="Select a project..."
            option-attribute="name"
            @update:modelValue="updateProject"
          />
        </UFormGroup>
        <UFormGroup label="Task">
          <AutoDropdown
            :options="tasks.filter(task => task.projectId === editingItem.projectId)"
            :modelValue="editingItem.taskName"
            placeholder="Select a task..."
            option-attribute="name"
            @update:modelValue="updateTask"
          />
        </UFormGroup>
        <UFormGroup label="Elapsed Time">
          <UInput
            v-model="editingItem.elapsedTime"
            :formatter="formatTime"
            :parser="parseTime"
          />
        </UFormGroup>
        <UFormGroup label="Date">
          <UInput
            v-model="editingItem.createdAt"
            type="date"
          />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <UButton color="gray" @click="closeModal"> Cancel </UButton>
          <UButton color="primary" @click="saveEditedItem"> Save Changes </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>