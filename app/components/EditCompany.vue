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

// Company-specific functions
const addCustomer = (employee) => {
  if (!editingItem.value.employeeIds.includes(employee.id)) {
    editingItem.value.employeeIds.push(employee.id)
  }
}

const removeCustomer = (index) => {
  editingItem.value.employeeIds.splice(index, 1)
}

const { customers, fetchCustomers } = useCustomers()
fetchCustomers()
</script>

<template>
  <UModal :model-value="isOpen" @close="closeModal">
    {{ editingItem.isEvaluation }}
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Edit Company</h3>
      </template>
      <div v-if="editingItem" class="mt-2 space-y-4">
        <UFormGroup label="Company Name">
          <UInput v-model="editingItem.name" />
        </UFormGroup>
        <UFormGroup label="City">
          <UInput v-model="editingItem.city" />
        </UFormGroup>
        <UFormGroup label="Country">
          <UInput v-model="editingItem.country" />
        </UFormGroup>
        <UFormGroup label="Website URL">
          <UInput v-model="editingItem.websiteUrl" type="url" />
        </UFormGroup>
        <UFormGroup label="Is Evaluation?" class="flex flex-row items-center gap-2">
          <UCheckbox v-model="editingItem.isEvaluation" />
        </UFormGroup>
        <UFormGroup label="Customers">
          <div class="flex flex-row flex-wrap max-w-full gap-1">
            <div
              v-for="(employeeId, index) in editingItem.employeeIds"
              :key="employeeId"
              class="text-xs"
            >
              <UButton
                color="gray"
                variant="ghost"
                @click="removeCustomer(index)"
                class="py-2 px-3 text-md bg-primary opacity-90 rounded-full"
              >
                {{ customers.find(c => c.id === employeeId)?.name || employeeId }}
              </UButton>
            </div>
          </div>
          <AutoDropdown
            :options="customers"
            placeholder="Add a customer..."
            option-attribute="name"
            @update:modelValue="addCustomer"
            class="mt-2"
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