<script setup>
const props = defineProps({
    selected: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['update-item'])

const { customers, fetchCustomers } = useCustomers()
fetchCustomers()

const isModalOpen = ref(false)
const editingItem = ref(null)

const handleEditClick = () => {
    if (props.selected.length === 1) {
        editingItem.value = { ...props.selected[0] }
        isModalOpen.value = true
    }
}

const closeModal = () => {
    isModalOpen.value = false
    editingItem.value = null
}

const saveEditedItem = () => {
    emit('update-item', editingItem.value)
    closeModal()
}

const addCustomer = (customer) => {
    if (!editingItem.value.relatedCustomerIds.includes(customer.id)) {
        editingItem.value.relatedCustomerIds.push(customer.id)
        editingItem.value.relatedCustomerNames.push(customer.name)
    }
}

const removeCustomer = (index) => {
    editingItem.value.relatedCustomerIds.splice(index, 1)
    editingItem.value.relatedCustomerNames.splice(index, 1)
}

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
                            <div class="flex flex-row flex-wrap max-w-full gap-1">
                                <div
                                    v-if="editingItem.relatedCustomerNames.length > 0"
                                    v-for="(name, index) in editingItem.relatedCustomerNames"
                                    :key="editingItem.relatedCustomerIds[index]"
                                    :text="name"
                                    class="text-xs"
                                >
                                        <UButton
                                            color="gray"
                                            variant="ghost"
                                            @click="removeCustomer(index)"
                                            class=" py-2 px-3 text-md bg-primary opacity-90 rounded-full"
                                        >{{ name }}</UButton>
                                </div>
                                <div v-else>
                                    No related customers. Add one below.
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