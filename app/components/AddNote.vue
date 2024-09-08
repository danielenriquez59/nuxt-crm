<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['add-row', 'close'])

const newNote = ref({
  body: '',
  relatedCustomers: [],
})

const { customers, fetchCustomers } = useCustomers()
fetchCustomers()

const handleSubmit = () => {
  emit('add-row', newNote.value)
  newNote.value = { body: '', relatedCustomers: [] }
}


const addCustomer = (customer) => {
  newNote.value.relatedCustomers.push(customer)
}

const removeCustomer = (index) => {
  newNote.value.relatedCustomers.splice(index, 1)
}

</script>

<template>
  <UModal :model-value="isOpen" @close="closeModal">
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Add New Note</h3>
      </template>
      <form @submit.prevent="handleSubmit">
        <div class=" space-y-4">
          <UFormGroup label="Note Body">
            <UTextarea v-model="newNote.body" required />
          </UFormGroup>
          <UFormGroup label="Related Customers">
            <div class="flex flex-row flex-wrap max-w-full gap-1 ">
              <div
                v-if="newNote.relatedCustomers?.length > 0"
                v-for="(customer, index) in newNote.relatedCustomers"
                :key="index"
                :text="customer.name"
                class="text-xs"
              >
                <UButton
                  color="gray"
                  variant="ghost"
                  @click="removeCustomer(index)"
                  class="py-2 px-3 text-md bg-primary opacity-90 rounded-full"
                  >
                  {{ customer.name }}
                  </UButton
                >
              </div>
            </div>
            <AutoDropdown
              :options="customers"
              placeholder="Add a related customer..."
              option-attribute="name"
              @update:modelValue="addCustomer"
              class="mt-2"
            />
          </UFormGroup>
        </div>
          <div class="flex justify-end space-x-2 mt-2">
            <UButton color="gray" @click="emit('close')">Cancel</UButton>
            <UButton color="primary" @click="handleSubmit">Add Note</UButton>
          </div>
      </form>
    </UCard>
  </UModal>
</template>