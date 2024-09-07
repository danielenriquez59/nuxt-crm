<script setup>
// Computed property to format the notes for the table
const { notes, loading, error, fetchNotes, addNote, updateNote, deleteNote } = useNotes()

onMounted(() => {
  // Fetch notes when the component is mounted
  fetchNotes()
})

// Table columns definition
const columns = [
  {
    key: 'body',
    label: 'Note',
  },
  {
    key: 'relatedCustomerNames',
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
  // this will add the relatedCustomerNames to the note object
  return notes.value.map((note) => ({
    id: note.id,
    body: note.body,
    relatedCustomerIds: note.relatedCustomerIds,
    relatedCustomerNames: note.relatedCustomerNames,
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

const handleAddRow = async (newRowData) => {
  try {
    // Validate and prepare the data
    if (typeof newRowData.body !== 'string' || newRowData.body.trim() === '') {
      toast.add({
        title: 'Error',
        message: 'Note body must be a non-empty string',
        color: 'red',
      })
      throw new Error('Note body must be a non-empty string')
    }

    // Convert relatedCustomerIds to an array of strings
    if (newRowData.relatedCustomerIds) {
      newRowData.relatedCustomerIds = newRowData.relatedCustomerIds.split(',').map((id) => {
        const trimmedId = id.trim()
        if (trimmedId === '') {
          toast.add({
            title: 'Error',
            message: 'Invalid customer ID: empty string',
            color: 'red',
          })
          throw new Error('Invalid customer ID: empty string')
        }
        return trimmedId
      })
    } else {
      newRowData.relatedCustomerIds = []
    }

    // Prepare the validated data for submission
    const validatedData = {
      body: newRowData.body.trim(),
      relatedCustomerIds: newRowData.relatedCustomerIds,
    }
    await addNote(validatedData)
    toast.add({
      title: 'Note added',
      message: 'The note has been added successfully',
      color: 'green',
    })
    await fetchNotes()
  } catch (error) {
    console.error('Failed to add note:', error)
    toast.add({
      title: 'Error',
      message: 'Failed to add note',
      color: 'red',
    })
  }
}

const handleUpdateItem = async (item) => {
  try {
    // Remove the relatedCustomerNames/createdAt field before updating
    if (item.relatedCustomerNames) {
      delete item.relatedCustomerNames
      delete item.createdAt
      // set a correctly formatted updatedAt
      item.updatedAt = new Date().toISOString()
    }
    // only the body and relatedCustomerIds should be updated
    await updateNote(item)
    toast.add({
      title: 'Note updated',
      message: 'The note has been updated successfully',
      color: 'green',
    })
    await fetchNotes()
  } catch (error) {
    console.error('Failed to update note:', error)
    toast.add({
      title: 'Error',
      message: 'Failed to update note',
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
    @add-row="handleAddRow"
    @update-item="handleUpdateItem"
    type="notes"
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
