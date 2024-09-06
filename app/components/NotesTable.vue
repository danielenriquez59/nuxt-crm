<script setup>
// Computed property to format the notes for the table
const { notes, loading, error, fetchNotes, addNotes, updateNotes, deleteNote } = useNotes()

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
const toast = useToast()

const handleDeleteItem = async (item) => {
  try {
    await deleteNote(item.id)
    toast.add({
      title: 'Note deleted',
      message: 'The note has been deleted successfully',
      color: 'green',
    })
    fetchNotes()
  } catch (error) {
    console.error('Failed to delete note:', error)
    toast.add({
      title: 'Error',
      message: 'Failed to delete note',
      color: 'red',
    })
  }
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