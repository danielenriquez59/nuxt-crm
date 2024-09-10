<script setup></script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <AppNav />
      <UDashboardPanelContent class="bg-zinc-50 m-0 py-0 px-1 p-2">
        <div class="grid grid-cols-2 gap-4">
          <AddNoteForm  />
          <NotesTable class="col-span-2" />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
