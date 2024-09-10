<script setup>
import Stopwatch from '@/components/timer/Stopwatch.vue'
import LogInput from '@/components/timer/LogInput.vue'
import LogsTable from '@/components/timer/LogsTable.vue'

const handleSelectionChange = (logItems) => {
  console.log('Selected items:', logItems)
  // Do something with the selected items
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <AppNav />
      <UDashboardPanelContent class="bg-zinc-50 m-0 p-2">
      <div class=" grid grid-cols-2 gap-4">
        <LogInput @selection-change="handleSelectionChange" />
        <Stopwatch @logged="handleLogged" />
        <LogsTable class="col-span-2" />
      </div>
    </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
