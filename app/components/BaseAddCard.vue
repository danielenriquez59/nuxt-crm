<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'i-heroicons-plus',
  },
  helpText: {
    type: String,
    default: '',
  },
})

const isFormVisible = ref(true)
</script>

<template>
  <div class="relative flex flex-col h-content">
    <UCard :ui="{ header: { padding: 'p-2 sm:px-4' } }">
      <template #header>
        <h3
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white flex flex-row justify-between"
        >
          <div class="flex flex-row items-center gap-3">
            <UIcon :name="icon" class="mr-2" />
            {{ title }}
            <UTooltip v-if="helpText" :text="helpText" :ui="{ width: 'max-w-xl' }">
              <UIcon name="i-heroicons-question-mark-circle" class="text-gray-500 hover:text-gray-700" />
            </UTooltip>
          </div>
          <ToggleVisibility
            @toggle-visibility="isFormVisible = !isFormVisible"
            :key="`add-${title.toLowerCase()}-form`"
          />
        </h3>
      </template>
      <form v-show="isFormVisible" @submit.prevent="$emit('submit')" class="relative">
        <div class="space-y-4">
          <slot></slot>
        </div>
        <div class="flex justify-end space-x-2 mt-3">
          <slot name="actions"></slot>
        </div>
      </form>
    </UCard>
  </div>
</template>
