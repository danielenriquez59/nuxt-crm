<script setup>
 const { 
    notes, 
    loading, 
    error, 
    fetchNotes, 
    addNotes, 
    updateNotes, 
    deleteNotes 
  } = useNotes()

// Fetch notes when the component is mounted
onMounted(() => {
  fetchNotes()
})

// Table columns definition
const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'body',
    label: 'Note',
  },
  {
    key: 'relatedCustomerIds',
    label: 'Related Customers',
  },
  {
    key: 'createdAt',
    label: 'Created At',
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
  },
]

// Computed property to format the notes for the table
const rows = computed(() => {
  if (!Array.isArray(notes.value)) {
    return []
  }
  return notes.value.map(note => ({
    id: note.id,
    body: note.body,
    relatedCustomerIds: Array.isArray(note.relatedCustomerIds) ? note.relatedCustomerIds.join(', ') : '',
    createdAt: note.createdAt ? new Date(note.createdAt).toLocaleString() : '',
    updatedAt: note.updatedAt ? new Date(note.updatedAt).toLocaleString() : '',
  }))
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <AppNav />

      <UDashboardToolbar>
        <template #left>
          <h1 class="text-2xl font-bold">Notes Dashboard</h1>
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <div class="mt-4">
          <UTable
            :columns="columns"
            :rows="rows"
            :loading="loading"
          >
            <template #loading-state>
              <div class="flex items-center justify-center h-32">
                <ULoadingIcon />
                <p class="ml-2">Loading notes...</p>
              </div>
            </template>
            <template #empty-state>
              <div class="flex flex-col items-center justify-center h-32">
                <p class="text-gray-500">No notes found.</p>
              </div>
            </template>
          </UTable>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
