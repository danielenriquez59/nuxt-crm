<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      companyId: null,
      projectId: null,
      taskId: null,
    }),
  },
})

const emit = defineEmits(['update:modelValue'])

const { companies, fetchCompanies } = useCompanies()
const { projects, fetchProjects } = useProjects()
const { tasks, fetchTasks } = useTasks()
const { lastUpdate } = useLastUpdateStore()

const logItems = ref({
  companyId: null,
  projectId: null,
  taskId: null,
})
// Fetch initial data
fetchCompanies()
fetchProjects()
fetchTasks()

const selectedCompany = ref(null)
const selectedProject = ref(null)
const selectedTask = ref(null)

watch(
  [selectedCompany, selectedProject, selectedTask],
  ([company, project, task]) => {
    const newLogItems = {
      companyId: company?.id || null,
      projectId: project?.id || null,
      taskId: task?.id || null,
    }
    logItems.value = newLogItems
    emit('update:modelValue', newLogItems)
  },
  { deep: true }
)

const updateSelectionsFromLastUpdate = () => {
  if (lastUpdate?.value) {
    selectedCompany.value = lastUpdate.value.company
    selectedProject.value = lastUpdate.value.project
    selectedTask.value = lastUpdate.value.task
  }
}

// Update selections when component is mounted
onMounted(() => {
  updateSelectionsFromLastUpdate()
})

// Watch for changes in lastUpdate
watch(lastUpdate, () => {
  updateSelectionsFromLastUpdate()
})
</script>

<template>
  <UCard class="space-y-0">
    <template #header>
      <h3
        class="text-base font-semibold text-gray-900 dark:text-white flex flex-row justify-between"
      >
        <div class="flex flex-row items-center">
          <UIcon name="i-heroicons-pencil" class="mr-2" />
          Select Task to Log
        </div>
      </h3>
    </template>
    <UFormGroup label="Company">
      <AutoDropdown
        v-model="selectedCompany"
        :options="companies"
        option-attribute="name"
        placeholder="Select a company..."
        @update:modelValue=""
      />
    </UFormGroup>

    <UFormGroup label="Project" class="my-3">
      <AutoDropdown
        v-model="selectedProject"
        :options="projects"
        option-attribute="name"
        placeholder="Select a project..."
        @update:modelValue=""
      />
    </UFormGroup>

    <UFormGroup label="Task">
      <AutoDropdown
        v-model="selectedTask"
        :options="tasks"
        option-attribute="name"
        placeholder="Select a task..."
        @update:modelValue=""
      />
    </UFormGroup>
  </UCard>
</template>
