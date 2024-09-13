<script setup>
const newTask = ref({
  name: '',
  description: '',
  projectId: '',
})

const { addTask, error } = useTasks()
const { projects, fetchProjects } = useProjects()
fetchProjects()

const handleSubmit = () => {
  addNewTask(newTask.value)
  newTask.value = { name: '', description: '', projectId: '' }
}

const addNewTask = async (item) => {
  await addTask(item)
  errorHandler(error, 'task', 'added')
}

const projectOptions = computed(() => 
  projects.value.map(project => ({ label: project.name, value: project.id }))
)
</script>

<template>
    <BaseAddCard title="Add New Task" icon="i-heroicons-check" @submit="handleSubmit">
      <UFormGroup label="Task Name">
        <UInput v-model="newTask.name" required placeholder="Enter task name" />
      </UFormGroup>
      <UFormGroup label="Description">
        <UTextarea v-model="newTask.description" placeholder="Enter task description (optional)" />
      </UFormGroup>
      <UFormGroup label="Project">
        <USelect
          v-model="newTask.projectId"
          :options="projectOptions"
          required
          placeholder="Select a project"
        />
      </UFormGroup>
      <template #actions>
        <UButton color="primary" type="submit">Add Task</UButton>
      </template>
    </BaseAddCard>
  </template>