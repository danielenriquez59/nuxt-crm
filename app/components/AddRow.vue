<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['add-row'])

const isModalOpen = ref(false)
const newRowData = ref({})

const openModal = () => {
  isModalOpen.value = true
  newRowData.value = {}
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleAddRow = () => {
  emit('add-row', newRowData.value)
  closeModal()
}

// Filter out auto-populated columns
const editableColumns = computed(() => {
  return props.columns.filter(column => 
    !['id', 'createdAt', 'updatedAt'].includes(column.key)
  )
})
</script>

<template>
  <div>
    <UTooltip text="Add Item">
      <UButton
        icon="i-heroicons-plus"
        color="primary"
        variant="soft"
        @click="openModal"
      >
      </UButton>
    </UTooltip>

    <UModal v-model="isModalOpen">
      <UCard class="relative">
        <template #header>
          <h3>Add New Item</h3>
          <div class="absolute top-1 right-1">
           <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="closeModal" />
          </div>
        </template>
        <form @submit.prevent="handleAddRow">
          <div class="space-y-4">
            <div v-for="column in editableColumns" :key="column.key">
              <UFormGroup :label="column.label">
                <UInput v-model="newRowData[column.key]" />
              </UFormGroup>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <UButton color="gray" variant="soft" @click="closeModal">
              Cancel
            </UButton>
            <UButton type="submit" color="primary">
              Add Row
            </UButton>
          </div>
        </form>
      </UCard>
    </UModal>
  </div>
</template>