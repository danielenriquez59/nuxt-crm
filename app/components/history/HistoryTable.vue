<script setup>

const { fetchHistory, getHistoryForTable, allTableNames, loadMore, lastFetched, tableHistories, sortedEvents, hasMoreEvents } = useHistory()
await fetchHistory()

const observerTarget = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMoreEvents.value) {
      loadMore()
    }
  }, {
    rootMargin: '0px 0px 200px 0px' // Start loading 200px before reaching the end
  })

  if (observerTarget.value) {
    observer.observe(observerTarget.value)
  }

  onUnmounted(() => {
    if (observerTarget.value) {
      observer.unobserve(observerTarget.value)
    }
  })
})

</script>

<template>
    <div>
      <h2>Recent Updates ({{ sortedEvents.length }})</h2>
      <ul>
        <li v-for="event in sortedEvents" :key="event.time" class="my-2 text-sm">
          <UCard>
            <div class="flex items-center">
              <UIcon v-if="event.description.startsWith('Compan')" name="i-heroicons-building-office" class="mr-2" />
              <UIcon v-else-if="event.description.startsWith('Project')" name="i-heroicons-briefcase" class="mr-2" />
              <UIcon v-else-if="event.description.startsWith('Note')" name="i-heroicons-pencil" class="mr-2" />
              <UIcon v-else-if="event.description.startsWith('Task')" name="i-heroicons-check-circle" class="mr-2" />
              <UIcon v-else-if="event.description.startsWith('Log')" name="i-heroicons-document-text" class="mr-2" />
              <UIcon v-else-if="event.description.startsWith('Customer')" name="i-heroicons-user" class="mr-2" />
              <span>{{ event.description }} at {{ event.time }}</span>
            </div>
          </UCard>
        </li>
      </ul>
      <div v-if="hasMoreEvents" class="text-center py-4">
        <USpinner />
      </div>
      <div ref="observerTarget" style="height: 1px;"></div>
    </div>
  </template>