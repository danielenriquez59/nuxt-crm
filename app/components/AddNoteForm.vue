<script setup>
const newNote = ref({
  body: '',
  contact_method: '',
  relatedCustomers: [],
})

const {addNote, error} = useNotes()
const { customers, fetchCustomers } = useCustomers()
fetchCustomers()

const handleSubmit = () => {
  addNewNote(newNote.value)
  newNote.value = { body: '', contact_method: '', relatedCustomers: [] }
}

const addCustomer = (customer) => {
  if (!newNote.value.relatedCustomers.some(c => c.id === customer.id)) {
    newNote.value.relatedCustomers.push(customer)
  }
}

const removeCustomer = (index) => {
  newNote.value.relatedCustomers.splice(index, 1)
}

const addNewNote = async (item) => {
    await addNote(item)
    errorHandler(error, 'note', 'added')
}

const isFormVisible = ref(true)
</script>

<template>
    <UCard :ui="{ header: {padding: 'p-2 sm:px-4'} }">
      <template #header>
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white flex flex-row justify-between">
            <div class="flex flex-row items-center">
                <UIcon name="i-heroicons-pencil" class="mr-2" />
                Add New Note
            </div>
            <ToggleVisibility @toggle-visibility="isFormVisible = !isFormVisible" key="add-note-form"/>
        </h3>
      </template>
      <form v-if="isFormVisible" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <UFormGroup label="Message">
            <UTextarea v-model="newNote.body" required />
          </UFormGroup>
          <UDivider 
            label="optional"
            :ui="{ label: 'opacity-60' }"
          />
          <UFormGroup label="Contact Method" class="">
            <div class="flex flex-row gap-x-0">
              <URadioGroup
                :options="contactMethods"
                v-model="newNote.contact_method"
                :ui="{
                  fieldset: 'grid grid-cols-2 gap-x-5'
                }"
              />
              <UButton 
                @click="newNote.contact_method = ''" 
                class="text-xs max-h-8" 
                v-if="newNote.contact_method"
                variant="ghost"
              >
                Clear
              </UButton>
            </div>
          </UFormGroup>
          <UFormGroup label="Related Customers">
            <div class="flex flex-row flex-wrap max-w-full gap-1">
              <div
                v-for="(customer, index) in newNote.relatedCustomers"
                :key="customer.id"
                class="text-xs"
              >
                <UButton
                  color="gray"
                  variant="ghost"
                  @click="removeCustomer(index)"
                  class="py-2 px-3 text-md bg-primary opacity-90 rounded-full"
                >
                  {{ customer.name }}
                </UButton>
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
        <div class="flex justify-end space-x-2 mt-3">
          <UButton color="primary" type="submit">Add Note</UButton>
        </div>
      </form>
    </UCard>
  </template>