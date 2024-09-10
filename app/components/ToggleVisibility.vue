<script setup>

const emit = defineEmits(['toggle-visibility'])
const isComponentVisible = ref(true)
const tooltipText = computed(() => (isComponentVisible.value ? 'Hide' : 'Show'))

const toggleComponentVisibility = () => {
  isComponentVisible.value = !isComponentVisible.value
  emit('toggle-visibility', isComponentVisible.value)
}
</script>

<template>
  <UTooltip :text="tooltipText" class="ml-auto">
    <UButton @click="toggleComponentVisibility" color="gray" variant="ghost">
      <UIcon :name="isComponentVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" />
    </UButton>
  </UTooltip>
</template>