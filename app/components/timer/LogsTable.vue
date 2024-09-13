<script setup>
import EditLog from '@/components/timer/EditLog.vue'

const { logs, loading, error, fetchLogs, updateLog, deleteLog } = useLogs()

fetchLogs()

// New refs for EditLog functionality
const isEditLogOpen = ref(false)
const selectedForEdit = ref(null)

// Table columns definition
const columns = [
  {
    key: 'elapsedTime',
    label: 'Elapsed Time',
    sortable: true,
  },
  {
    key: 'projectName',
    label: 'Project',
    sortable: true,
  },
  {
    key: 'companyName',
    label: 'Company',
    sortable: true,
  },
  {
    key: 'taskName',
    label: 'Task',
    sortable: true,
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    sortable: true,
  },
]

const rows = computed(() => {
  if (!Array.isArray(logs.value)) {
    return []
  }

  return logs.value.map(log => ({
    ...log,
    elapsedTime: formatElapsedTime(log.elapsedTime),
    updatedAt: log.updatedAt ? new Date(log.updatedAt).toLocaleString() : '',
    createdAt: log.createdAt ? new Date(log.createdAt).toLocaleString() : '',
  }))
})

const { setLastUpdate } = useLastUpdateStore();
watchEffect(() => {
  if (rows.value.length > 0) {
    const lastUpdatedItem = rows.value.reduce((latest, current) => {
      return new Date(current.updatedAt) > new Date(latest.updatedAt) ? current : latest;
    });
    setLastUpdate(lastUpdatedItem);
  }
});

const handleDeleteItem = async (item) => {
  await deleteLog(item)
  errorHandler(error, 'log', 'deleted')
}

const handleUpdateItem = async (item) => {
    await updateLog(item)
    isEditLogOpen.value = false
    selectedForEdit.value = null
    setLastUpdate(item);
    errorHandler(error, 'log', 'updated')
}

const openEditModal = (item) => {
  selectedForEdit.value = { ...item }
  isEditLogOpen.value = true
}

const closeEditLog = () => {
  isEditLogOpen.value = false
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
      type="logs"
    >
      <template #header>
        <h2>Logs</h2>
      </template>
      <template #loading-text>
        <p class="ml-2">Loading logs...</p>
      </template>
      <template #empty-text>
        <p class="ml-2">No logs found.</p>
      </template>
    </BaseTable>

    <EditLog
      v-if="isEditLogOpen"
      :selected="selectedForEdit"
      :is-open="isEditLogOpen"
      @update-item="handleUpdateItem"
      @close="closeEditLog"
    />
  </div>
</template>