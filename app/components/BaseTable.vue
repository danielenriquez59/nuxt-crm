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
  },
  tableType: {
    type: String,
    default: 'notes'
  }
})


const search = ref('')
const emit = defineEmits(['update:modelValue', 'delete-item', 'update-item'])

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
  emit('add-row', newRowData)
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

const selected = ref([])

const handleUpdateItem = (item) => {
  emit('update-item', item)
}

</script>

<template>
    <UCard class="shadow-md">
        <div id="table-header" class="flex flex-row px-1  pb-3 border-b border-gray-200 dark:border-gray-700 gap-4  items-end">
            <h2 class="mr-5"><slot name="header"></slot></h2>
            <UInput v-model="search" placeholder="Filter" />
            <UPagination
            v-model="page"
      :page-count="pageCount"
      :total="totalItems"
        />
        <BaseAddRow :columns="columns" @add-row="handleAddRow" />
        <EditNote v-if="tableType === 'notes'" :columns="columns" @update-item="handleUpdateItem" :selected="selected" />
        <p class="opacity-70 ml-auto text-md">Total Items: {{ totalItems }}</p>
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
      v-model="selected"
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
        <div class="flex flex-col items-center justify-center h-48">
            <slot name="loading-text"></slot>
          <USkeleton
            v-for="i in 3"
            :key="i"
            class="h-1/2 w-1/3 m-2"
          />
          <USkeleton
            v-for="i in 3"
            :key="i"
            class="h-1/2 w-1/3 m-2"
          />
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