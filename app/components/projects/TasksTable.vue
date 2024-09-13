<script setup>

const { tasks, loading, error, fetchTasks, updateTask, deleteTask } = useTasks()

fetchTasks()

// Refs for EditTask functionality
const isEditTaskOpen = ref(false)
const selectedForEdit = ref(null)

// Table columns definition
const columns = [
  {
    key: 'name',
    label: 'Task Name',
    sortable: true,
  },
  {
    key: 'description',
    label: 'Description',
    sortable: true,
  },
  {
    key: 'projectName',
    label: 'Project',
    sortable: true,
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    sortable: true,
  },
]

const rows = computed(() => {
  if (!Array.isArray(tasks.value)) {
    return []
  }

  return tasks.value.map(task => ({
    ...task,
    projectName: task.project?.name || '',
    updatedAt: task.updatedAt ? new Date(task.updatedAt).toLocaleString() : '',
    createdAt: task.createdAt ? new Date(task.createdAt).toLocaleString() : '',
  }))
})

const handleDeleteItem = async (item) => {
  await deleteTask(item)
  errorHandler(error, 'task', 'deleted')
}

const handleUpdateItem = async (item) => {
  await updateTask(item)
  isEditTaskOpen.value = false
  selectedForEdit.value = null
  errorHandler(error, 'task', 'updated')
}

const openEditModal = (item) => {
  selectedForEdit.value = { ...item }
  isEditTaskOpen.value = true
}

const closeEditTask = () => {
  isEditTaskOpen.value = false
  selectedForEdit.value = null
}

</script>

<template>
  <div>
    <BaseTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
      @delete-item="handleDeleteItem"
      @update-item="openEditModal"
      type="tasks"
    >
      <template #header>
        <h2 class="text-xl font-bold">Tasks</h2>
      </template>
      <template #loading-text>
        <p class="ml-2">Loading tasks...</p>
      </template>
      <template #empty-text>
        <p class="ml-2">No tasks found.</p>
      </template>
    </BaseTable>

    <EditTask
      v-if="isEditTaskOpen"
      :selected="selectedForEdit"
      :is-open="isEditTaskOpen"
      @update-item="handleUpdateItem"
      @close="closeEditTask"
    />
  </div>
</template>