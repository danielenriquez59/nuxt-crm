<script setup>
const props = defineProps({
    selected: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['update-item'])

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

const editableFields = computed(() => {
    if (!editingItem.value) return {}
    const { id, createdAt, updatedAt, ...rest } = editingItem.value
    return Object.fromEntries(
        Object.entries(rest).filter(([key]) => !key.includes('Ids') && !['id', 'createdAt', 'updatedAt'].includes(key))
    )
})
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
                        Edit Item
                    </h3>
                </template>
                <div v-if="editingItem" class="mt-2 space-y-4">
                    <UFormGroup v-for="(value, key) in editableFields" :key="key" :label="key">
                        <UInput v-if="typeof value !== 'object'" v-model="editingItem[key]" />
                        <UTextarea v-else v-model="editingItem[key]" />
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