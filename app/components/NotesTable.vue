<script setup>
// Computed property to format the notes for the table
const { notes, loading, error, fetchNotes, addNotes, updateNotes, deleteNotes } = useNotes()

onMounted(() => {
// Fetch notes when the component is mounted
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

const rows = computed(() => {
  if (!Array.isArray(notes.value)) {
    return []
  }
  return notes.value.map((note) => ({
    id: note.id,
    body: note.body,
    relatedCustomerIds: Array.isArray(note.relatedCustomerIds)
      ? note.relatedCustomerIds.join(', ')
      : '',
    createdAt: note.createdAt ? new Date(note.createdAt).toLocaleString() : '',
    updatedAt: note.updatedAt ? new Date(note.updatedAt).toLocaleString() : '',
  }))
})

const page = ref(1)
const pageCount = 5

const handleDeleteItem = (item) => {
  // Implement your deletion logic here
  console.log('Delete item:', item)
  // You might want to call a method from your useNotes composable here
  // For example: deleteNote(item.id)
}

</script>
<template>
    <BaseTable 
      :columns="columns" 
      :rows="rows" 
      :loading="loading"
      v-model="page"
      :page-count="pageCount"
      @delete-item="handleDeleteItem"
    >
      <template #header>
        <h2>Notes</h2>
      </template>
      <template #loading-text>
        <p class="ml-2">Loading notes...</p>
      </template>
      <template #empty-text>
        <p class="ml-2">No notes found.</p>
      </template>
    </BaseTable>
  </template>