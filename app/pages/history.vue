<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <AppNav />
      <UDashboardPanelContent class="bg-zinc-50 m-0 py-0 px-1 p-2">
        <div class="grid grid-cols-2 gap-4">
          <HistoryTable class="col-span-2 md:col-span-1" />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
