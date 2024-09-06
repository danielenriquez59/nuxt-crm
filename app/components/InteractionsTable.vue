<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInteractions } from '~/composables/useInteractions'

const { interactions, loading, error, fetchInteractions } = useInteractions()

onMounted(() => {
  fetchInteractions()
})

// Table columns definition
const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'method',
    label: 'Method',
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

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  if (!Array.isArray(interactions.value)) {
    return []
  }
  return interactions.value.map((interaction) => ({
    id: interaction.id,
    method: interaction.method,
    relatedCustomerIds: Array.isArray(interaction.relatedCustomerIds)
      ? interaction.relatedCustomerIds.join(', ')
      : '',
    createdAt: interaction.createdAt ? new Date(interaction.createdAt).toLocaleString() : '',
    updatedAt: interaction.updatedAt ? new Date(interaction.updatedAt).toLocaleString() : '',
  }))
})
</script>

<template>
    <BaseTable 
      :columns="columns" 
      :rows="rows" 
      :loading="loading"
      v-model="page"
      :page-count="pageCount"
    >
      <template #header>
        <h2>Interactions Table</h2>
      </template>
      <template #loading-text>
        <p class="ml-2">Loading interactions...</p>
      </template>
      <template #empty-text>
        <p class="ml-2">No interactions found.</p>
      </template>
    </BaseTable>
  </template>