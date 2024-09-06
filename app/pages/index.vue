<script setup>

</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <AppNav />
        <UDashboardPanelContent class="bg-zinc-50 m-0 py-0 px-1">
            <NotesTable class="m-2" />
            <InteractionsTable class="m-2" />
        </UDashboardPanelContent>
      </UDashboardPanel>
    </UDashboardPage>
</template>
