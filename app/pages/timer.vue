<script setup>
import Stopwatch from '@/components/timer/Stopwatch.vue'
import LogInput from '@/components/timer/LogInput.vue'
import LogsTable from '@/components/timer/LogsTable.vue'

const { addLog, fetchLogs } = useLogs()
const logItems = ref({
  companyId: null,
  projectId: null,
  taskId: null
})

const handleLogged = async (time) => {
  logItems.value.elapsedTime = time
  await addLog(logItems.value)
  errorHandler(error, 'log', 'added')
  fetchLogs()
}

</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <AppNav />
      <UDashboardPanelContent class="bg-zinc-50 m-0 p-2">
      <div class=" grid grid-cols-2 gap-4">
        <LogInput  v-model="logItems" />
        <Stopwatch @logged="handleLogged" />
        <LogsTable class="col-span-2" />
      </div>
    </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
