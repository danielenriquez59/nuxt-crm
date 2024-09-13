<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'i-heroicons-plus'
  }
})

const isFormVisible = ref(true)
</script>

<template>
  <div class="flex flex-col h-content">
      <UCard :ui="{    header: {padding: 'p-2 sm:px-4'}  }">
        <template #header>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white flex flex-row justify-between">
            <div class="flex flex-row items-center">
              <UIcon :name="icon" class="mr-2" />
              {{ title }}
            </div>
            <ToggleVisibility @toggle-visibility="isFormVisible = !isFormVisible" :key="`add-${title.toLowerCase()}-form`"/>
          </h3>
        </template>
        <form v-show="isFormVisible" @submit.prevent="$emit('submit')">
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