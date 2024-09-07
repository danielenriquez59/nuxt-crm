<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
  optionAttribute: {
    type: String,
    default: 'name',
  },
  idAttribute: {
    type: String,
    default: 'id',
  },
  options: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const loading = ref(false)
const selected = ref(props.modelValue)

watch(selected, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <UInputMenu
    v-model="selected"
    :options="options"
    :loading="loading"
    :placeholder="placeholder"
    :option-attribute="optionAttribute"
    :by="idAttribute"
    trailing
  />
</template>
