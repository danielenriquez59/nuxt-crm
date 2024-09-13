<script setup>
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits(['update:modelValue', 'delete-item', 'update-item'])

const pageCount = ref(10)
const search = ref('')
const page = ref(1)

const pageCountOptions = [
  { label: '5 per page', value: 5 },
  { label: '10 per page', value: 10 },
  { label: '15 per page', value: 15 },
]

const filteredRows = computed(() => {
  if (!search.value) return props.rows
  return props.rows.filter((row) => {
    return props.columns.some((column) =>
      String(row[column.key]).toLowerCase().includes(search.value.toLowerCase())
    )
  })
})

const displayedRows = computed(() => {
  const start = (page.value - 1) * pageCount.value
  const end = start + pageCount.value
  return filteredRows.value.slice(start, end)
})

const totalItems = computed(() => filteredRows.value.length)

const isTableVisible = ref(true)

const columnsWithDelete = computed(() => [
  ...props.columns,
  {
    key: 'actions',
  },
])

const items = (row) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => emit('update-item', row),
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => emit('delete-item', row),
    },
  ],
]
</script>

<template>
  <UCard class="shadow-md">
    <div
      id="table-header"
      class="flex flex-row px-1 pb-3 border-b border-gray-200 dark:border-gray-700 gap-4 items-end items-center"
    >
      <h2 class="mr-8"><slot name="header"></slot></h2>
      <UInput v-model="search" placeholder="Filter" />
      <UPagination v-model="page" :page-count="pageCount" :total="totalItems" />
      <USelect
        v-model="pageCount"
        :options="pageCountOptions"
        placeholder="Items per page"
        class="w-36"
      />
      <p class="opacity-70 text-md">Total: {{ totalItems }}</p>
      <ToggleVisibility @toggle-visibility="isTableVisible = !isTableVisible" />
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
            'text-xs min-w-content max-w-[20vw] overflow-x-auto outline outline-gray-50 outline-1': true,
          },
        },
        tr: {
          base: 'hover:bg-zinc-50 dark:hover:bg-gray-800/50 py-0',
        },
      }"
    >
      <template #name-data="{ row }"> </template>
      <template #loading-state>
        <div class="flex flex-col items-center justify-center h-48">
          <slot name="loading-text"></slot>
          <USkeleton v-for="i in 3" :key="i" class="h-1/2 w-1/3 m-2" />
          <USkeleton v-for="i in 3" :key="i" class="h-1/2 w-1/3 m-2" />
        </div>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center h-32">
          <slot name="empty-text"></slot>
        </div>
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </UCard>
</template>
