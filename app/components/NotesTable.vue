<script setup>
const page = ref(1)
const pageCount = 5
const toast = useToast()

// Computed property to format the notes for the table
const { notes, loading, error, fetchNotes, addNote, updateNote, deleteNote } = useNotes()

fetchNotes()

// Table columns definition
const columns = [
  {
    key: 'body',
    label: 'Note',
    sortable: true,
  },
  {
    key: 'relatedCustomerNames',
    label: 'Related Customers',
    sortable: true,
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    sortable: true,
  },
]

const rows = computed(() => {
  if (!Array.isArray(notes.value)) {
    return []
  }
//   format the createdAt
  return notes.value
})

const handleDeleteItem = async (item) => {
  try {
    await deleteNote(item.id)
    toast.add({
      title: 'Note deleted',
      message: 'The note has been deleted successfully',
      color: 'green',
    })
  } catch (error) {
    console.error('Failed to delete note:', error)
    toast.add({
      title: 'Error',
      message: 'Failed to delete note',
      color: 'red',
    })
  }
}

const handleAddRow = async (item) => {
  try {
    // Validate and prepare the data
    if (typeof item.body !== 'string' || item.body.trim() === '') {
      toast.add({
        title: 'Error',
        message: 'Note body must be a non-empty string',
        color: 'red',
      })
      throw new Error('Note body must be a non-empty string')
    }

    // Convert relatedCustomers to an array of strings
    if (item.relatedCustomers) {
      item.relatedCustomers = item.relatedCustomers.split(',').map((id) => {
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
      item.relatedCustomers = []
    }

    // Prepare the validated data for submission
    const validatedData = {
      body: item.body.trim(),
      relatedCustomers: item.relatedCustomers,
    }

    await addNote(validatedData)
    toast.add({
      title: 'Note added',
      message: 'The note has been added successfully',
      color: 'green',
    })
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
    await updateNote(item)
    console.log("at handleUpdateItem:", item)
    toast.add({
      title: 'Note updated',
      message: 'The note has been updated successfully',
      color: 'green',
    })
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
