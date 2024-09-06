<script setup>
const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  modelValue: { // This replaces the 'page' prop
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    default: 5
  }
})


const search = ref('')
const emit = defineEmits(['update:modelValue', 'delete-item'])

const page = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const filteredRows = computed(() => {
  if (!search.value) return props.rows
  return props.rows.filter(row => {
    return props.columns.some(column => 
      String(row[column.key]).toLowerCase().includes(search.value.toLowerCase())
    )
  })
})


const displayedRows = computed(() => {
  const start = (page.value - 1) * props.pageCount
  const end = start + props.pageCount
  return filteredRows.value.slice(start, end)
})

const totalItems = computed(() => filteredRows.value.length)

const isTableVisible = ref(true)
const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value
}

const tooltipText = computed(() => isTableVisible.value ? 'Hide' : 'Show')

const handleAddRow = (newRowData) => {
  // Placeholder for row addition logic
  console.log('New row data:', newRowData)
  // You might want to emit an event here or call a method passed as a prop
}

const columnsWithDelete = computed(() => [
  ...props.columns,
  {
    key: 'delete',
    label: 'Delete',
    icon: 'i-heroicons-trash'
  }
])

const handleDeleteClick = (item) => {
  emit('delete-item', item)
}

</script>

<template>
    <UCard class="shadow-md">
        <div id="table-header" class="flex flex-row px-1 py-1 border-b border-gray-200 dark:border-gray-700 gap-4 justify-center">
            <h2 class="mr-5"><slot name="header"></slot></h2>
            <UInput v-model="search" placeholder="Filter" />
            <UPagination
            v-model="page"
      :page-count="pageCount"
      :total="totalItems"
        />
        <AddRow :columns="columns" @add-row="handleAddRow" />
        <p class="opacity-70">Total Items: {{ totalItems }}</p>
        <UTooltip :text="tooltipText" class="ml-auto">
            <UButton
              @click="toggleTableVisibility"
              color="gray"
              variant="ghost"
            >
              <UIcon :name="isTableVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" />
            </UButton>
        </UTooltip>
          </div>
          <UTable
      v-if="isTableVisible"
      :columns="columnsWithDelete"
      :rows="displayedRows"
      :loading="loading"
      :ui="{
        td: {
          base: {
            replace: 'whitespace-nowrap py-0 px-0',
            'text-xs min-w-content max-w-[20vw] overflow-x-auto outline outline-gray-50 outline-1': true
          },
        },
        tr: {
          base: 'hover:bg-zinc-50 dark:hover:bg-gray-800/50 py-0',
        },
      }"
    >
      <template #loading-state>
        <div class="flex items-center justify-center h-32">
          <USkeleton
            v-for="i in 5"
            :key="i"
            class="h-8 w-full m-2"
          />
          <slot name="loading-text"></slot>
        </div>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center h-32">
          <slot name="empty-text"></slot>
        </div>
      </template>
      <template #delete-data="{ row }">
        <UButton
          color="red"
          variant="ghost"
          icon="i-heroicons-trash"
          size="xs"
          @click="handleDeleteClick(row)"
        />
      </template>
    </UTable>
    </UCard>

</template>