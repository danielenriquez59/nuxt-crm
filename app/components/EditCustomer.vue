<script setup>
const props = defineProps({
  selected: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update-item', 'close'])

const editingItem = ref(null)
watch(() => props.selected, (newValue) => {
  if (newValue) {
    editingItem.value = { ...newValue }
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const saveEditedItem = () => {
  emit('update-item', editingItem.value)
  closeModal()
}

// Fetch companies for the company dropdown
const { companies, fetchCompanies } = useCompanies()
fetchCompanies()

// Customer status options
const statusOptions = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
]
</script>

<template>
  <UModal :model-value="isOpen" @close="closeModal">
    {{ editingItem }}
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Edit Customer</h3>
      </template>
      <div v-if="editingItem" class="mt-2 space-y-4">
        <UFormGroup label="Name">
          <UInput v-model="editingItem.name" />
        </UFormGroup>
        <UFormGroup label="Email">
          <UInput v-model="editingItem.email" type="email" />
        </UFormGroup>
        <UFormGroup :label="`Current Status: ${editingItem.status.charAt(0).toUpperCase() + editingItem.status.slice(1)}`">
          <USelect v-model="editingItem.status" :options="statusOptions" />
        </UFormGroup>
        <UFormGroup label="Company">
          <AutoDropdown
            :options="companies"
            v-model="editingItem.companyId"
            :selected="editingItem.companyId"
            :label="editingItem.companyName"
            :placeholder="editingItem.companyName"
            :search="true"
            :multiple="false"
          />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <UButton color="gray" @click="closeModal">Cancel</UButton>
          <UButton color="primary" @click="saveEditedItem">Save Changes</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>