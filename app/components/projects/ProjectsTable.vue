<script setup>
const EditProject = defineAsyncComponent(() => import('~/components/projects/EditProject.vue'))

const { projects, loading, error, updateProject, deleteProject } = useProjects()

// Refs for EditProject functionality
const isEditProjectOpen = ref(false)
const selectedForEdit = ref(null)

// Table columns definition
const columns = [
  {
    key: 'name',
    label: 'Project Name',
    sortable: true,
  },
  {
    key: 'description',
    label: 'Description',
    sortable: true,
  },
  {
    key: 'company.name',
    label: 'Company',
    sortable: true,
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    sortable: true,
  },
]

const rows = computed(() => {
  if (!Array.isArray(projects.value)) {
    return []
  }

  return projects.value.map((project) => ({
    ...project,
    updatedAt: project.updatedAt ? new Date(project.updatedAt).toLocaleString() : '',
    createdAt: project.createdAt ? new Date(project.createdAt).toLocaleString() : '',
  }))
})

const handleDeleteItem = async (item) => {
  await deleteProject(item)
  errorHandler(error, 'project', 'deleted')
}

const handleUpdateItem = async (item) => {
  await updateProject(item)
  isEditProjectOpen.value = false
  selectedForEdit.value = null
  errorHandler(error, 'project', 'updated')
}

const openEditModal = (item) => {
  selectedForEdit.value = { ...item }
  isEditProjectOpen.value = true
}

const closeEditProject = () => {
  isEditProjectOpen.value = false
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
      type="projects"
    >
      <template #header>
        <h2 class="text-xl font-bold">Projects</h2>
      </template>
      <template #loading-text>
        <p class="ml-2">Loading projects...</p>
      </template>
      <template #empty-text>
        <p class="ml-2">No projects found.</p>
      </template>
    </BaseTable>

    <EditProject
      :selected="selectedForEdit"
      :is-open="isEditProjectOpen"
      @update-item="handleUpdateItem"
      @close="closeEditProject"
    />
  </div>
</template>
