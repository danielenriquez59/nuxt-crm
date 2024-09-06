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
  const formattedNotes = notes.value.map((note) => ({
    id: note.id,
    body: note.body,
    relatedCustomerIds: Array.isArray(note.relatedCustomerIds)
      ? note.relatedCustomerIds.join(', ')
      : '',
    createdAt: note.createdAt ? new Date(note.createdAt).toLocaleString() : '',
    updatedAt: note.updatedAt ? new Date(note.updatedAt).toLocaleString() : '',
  }))
  return formattedNotes.slice((page.value - 1) * pageCount, page.value * pageCount)
})

const page = ref(1)
const pageCount = 5

</script>
<template>
    <BaseTable :columns="columns" :rows="rows" :loading="loading">
              <template #header>
                <h2>Notes Table</h2>
              </template>
              <template #loading-text>
                <p class="ml-2">Loading notes...</p>
              </template>
              <template #empty-text>
                <p class="ml-2">No notes found.</p>
              </template>
            </BaseTable>
</template>