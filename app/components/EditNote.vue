<script setup>
const props = defineProps({
    selected: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['update-item'])

const { customers, fetchCustomers } = useCustomers()

const isModalOpen = ref(false)
const editingItem = ref(null)
const customerSearch = ref('')
const filteredCustomers = ref([])

const handleEditClick = () => {
    if (props.selected.length === 1) {
        editingItem.value = { ...props.selected[0] }
        isModalOpen.value = true
    }
}

const closeModal = () => {
    isModalOpen.value = false
    editingItem.value = null
    customerSearch.value = ''
}

const saveEditedItem = () => {
    emit('update-item', editingItem.value)
    closeModal()
}

watch(customerSearch, (newSearch) => {
    if (newSearch) {
        filteredCustomers.value = customers.value.filter(customer => 
            customer.name.toLowerCase().includes(newSearch.toLowerCase())
        )
    } else {
        filteredCustomers.value = []
    }
})

const addCustomer = (customer) => {
    if (!editingItem.value.relatedCustomerIds.includes(customer.id)) {
        editingItem.value.relatedCustomerIds.push(customer.id)
        editingItem.value.relatedCustomerNames.push(customer.name)
    }
    customerSearch.value = ''
}

const removeCustomer = (index) => {
    editingItem.value.relatedCustomerIds.splice(index, 1)
    editingItem.value.relatedCustomerNames.splice(index, 1)
}

const editableFields = computed(() => {
    if (!editingItem.value) return {}
    const { id, createdAt, updatedAt, ...rest } = editingItem.value
    return rest
})

// Fetch customers when the component is mounted
fetchCustomers()
</script>

<template>
    <div v-if="selected.length == 1">
        <UTooltip text="Edit Item">
            <UButton
                
                color="gray"
                variant="solid"
                icon="i-heroicons-pencil"
                size="sm"
                @click="handleEditClick"
            />
        </UTooltip>

        <UModal v-model="isModalOpen">
            <UCard>
                <template #header>
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Edit Note
                    </h3>
                </template>
                <div v-if="editingItem" class="mt-2 space-y-4">
                    <UFormGroup label="Note Body">
                        <UTextarea v-model="editingItem.body" rows="4" />
                    </UFormGroup>
                    <UFormGroup label="Related Customers">
                            <UChip 
                                v-for="(name, index) in editingItem.relatedCustomerNames" 
                                :key="editingItem.relatedCustomerIds[index]"
                                :text="name"
                                class="text-base py-2 px-3 text-lg"
                            >
                                <template #append>
                                    <UButton 
                                        color="gray" 
                                        variant="ghost" 
                                        icon="i-heroicons-x-mark" 
                                        @click="removeCustomer(index)"
                                        class="text-lg"
                                    />
                                </template>
                            </UChip>
                        <UAutocomplete
                            v-model="customerSearch"
                            :options="filteredCustomers"
                            option-attribute="name"
                            placeholder="Search customers..."
                            @item-selected="addCustomer"
                        >
                            <template #item="{ item }">
                                <span>{{ item.name }}</span>
                            </template>
                        </UAutocomplete>
                    </UFormGroup>
                </div>
                <template #footer>
                    <div class="flex justify-end space-x-2">
                        <UButton color="gray" @click="closeModal">
                            Cancel
                        </UButton>
                        <UButton color="primary" @click="saveEditedItem">
                            Save Changes
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>