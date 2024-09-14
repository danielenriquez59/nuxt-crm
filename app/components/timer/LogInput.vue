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

const { companies } = useCompanies()
const { projects } = useProjects()
const { tasks } = useTasks()
const { logs } = useLogs()

const logItems = ref({
  companyId: null,
  projectId: null,
  taskId: null,
})


const selectedCompany = ref(null)
const selectedProject = ref(null)
const selectedTask = ref(null)

const mostRecentLog = computed(() => {
  if (logs.value && logs.value.length > 0) {
    return logs.value.reduce((latest, current) => {
      return new Date(current.updatedAt) > new Date(latest.updatedAt) ? current : latest
    })
  }
  return null
})

const updateSelectionsFromRecentLog = () => {
  if (mostRecentLog.value) {
    selectedCompany.value = mostRecentLog.value.company
    selectedProject.value = mostRecentLog.value.project
    selectedTask.value = mostRecentLog.value.task
  }
}

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

updateSelectionsFromRecentLog()

// Watch for changes in logs
watch(() => logs.value, () => {
  updateSelectionsFromRecentLog()
}, { deep: true })

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
