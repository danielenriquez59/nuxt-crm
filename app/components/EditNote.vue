<script setup>
const props = defineProps({
  selected: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
})

// generic const and functions
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

// note specific functions
const { customers, fetchCustomers } = useCustomers()
fetchCustomers()

const addCustomer = (customer) => {
  if (!editingItem.value.relatedCustomers.includes(customer.id)) {
    editingItem.value.relatedCustomers.push(customer.id)
    editingItem.value.relatedCustomerNames.push(customer.name)
  }
}

const removeCustomer = (index) => {
  editingItem.value.relatedCustomers.splice(index, 1)
  editingItem.value.relatedCustomerNames.splice(index, 1)
}
</script>

<template>
    <UModal  :model-value="isOpen" @close="closeModal">
      <UCard>
        <template #header>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Edit Note</h3>
        </template>
        <div v-if="editingItem" class="mt-2 space-y-4">
          <UFormGroup label="Note Body">
            <UTextarea v-model="editingItem.body" rows="4" />
          </UFormGroup>
          <UFormGroup label="Related Customers">
            <div 
            v-if="editingItem.relatedCustomerNames?.length > 0"
            class="flex flex-row flex-wrap max-w-full gap-1">
              <div
                v-for="(name, index) in editingItem.relatedCustomerNames"
                :key="editingItem.relatedCustomers[index]"
                :text="name"
                class="text-xs"
              >
                <UButton
            v-if="editingItem.relatedCustomerNames?.length > 0"
                  color="gray"
                  variant="ghost"
                  @click="removeCustomer(index)"
                  class="py-2 px-3 text-md bg-primary opacity-90 rounded-full"
                  >{{ name }}</UButton
                >
              </div>
            </div>
            <div v-else>No related customers. Add one below.</div>
            <AutoDropdown
              :options="customers"
              placeholder="Add a related customer..."
              option-attribute="name"
              @update:modelValue="addCustomer"
              class="mt-2"
            />
          </UFormGroup>
        </div>
        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton color="gray" @click="closeModal"> Cancel </UButton>
            <UButton color="primary" @click="saveEditedItem"> Save Changes </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
</template>
