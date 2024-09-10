<script setup>

const page = ref(1)

const { notes, loading, error, fetchNotes, updateNote, deleteNote } = useNotes()

fetchNotes()

// New refs for EditNote functionality
const isEditNoteOpen = ref(false)
const selectedForEdit = ref(null)

// Table columns definition
const columns = [
  {
    key: 'body',
    label: 'Note',
    sortable: true,
  },
  {
    key: 'contact_method',
    label: 'Contact Method',
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

  return notes.value.map(note => ({
    ...note,
    contact_method: note.contact_method ? (contactMethodsMap[note.contact_method] || note.contact_method) : '',
    relatedCustomerNames: note.relatedCustomers?.map(customer => customer?.name).join(', ') || '',
    updatedAt: note.updatedAt ? new Date(note.updatedAt).toLocaleString() : '',
    createdAt: note.createdAt ? new Date(note.createdAt).toLocaleString() : '',
  }))
})

const handleDeleteItem = async (item) => {
  await deleteNote(item)
  errorHandler(error, 'note', 'deleted')
}

const handleUpdateItem = async (item) => {
    await updateNote(item)
    isEditNoteOpen.value = false
    selectedForEdit.value = null
    errorHandler(error, 'note', 'updated')
}

const openEditModal = (item) => {
  // Convert relatedCustomerNames string back to an array
  if (typeof item.relatedCustomerNames === 'string') {
    item.relatedCustomerNames = item.relatedCustomerNames.split(',').map(name => name.trim());
  }
  selectedForEdit.value = { ...item }
  isEditNoteOpen.value = true
}

const closeEditNote = () => {
  isEditNoteOpen.value = false
  selectedForEdit.value = null
}

</script>

<template>
  <div>
    <BaseTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
      v-model="page"
      @delete-item="handleDeleteItem"
      @update-item="openEditModal"
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

    <EditNote
      v-if="isEditNoteOpen"
      :selected="selectedForEdit"
      :is-open="isEditNoteOpen"
      @update-item="handleUpdateItem"
      @close="closeEditNote"
    />
  </div>
</template>