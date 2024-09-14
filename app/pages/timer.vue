<script setup>
import Stopwatch from '@/components/timer/Stopwatch.vue'
import LogInput from '@/components/timer/LogInput.vue'
import LogsTable from '@/components/timer/LogsTable.vue'

const toast = useToast()
const { addLog, fetchLogs, error } = useLogs()
const logItems = ref({
  companyId: null,
  projectId: null,
  taskId: null,
})

const handleLogged = async (time) => {
  if (!logItems.value.companyId || !logItems.value.projectId || !logItems.value.taskId) {
    toast.add({
      title: 'Error',
      description: 'Please select a company, project, and task before logging time.',
      color: 'red'
    })
    return
  }

  logItems.value.elapsedTime = time
  await addLog(logItems.value)
  errorHandler(error, 'log', 'added')
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <AppNav />
      <UDashboardPanelContent class="bg-zinc-50 m-0 p-2">
        <div class="grid grid-cols-2 gap-4">
          <LogInput v-model="logItems" />
          <Stopwatch @logged="handleLogged" />
          <LogsTable class="col-span-2" />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
