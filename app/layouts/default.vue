<script setup lang="ts">
const appConfig = useAppConfig()

const links = [
  {
    id: 'timer',
    label: 'Timer',
    icon: 'i-heroicons-clock',
    to: '/timer',
    tooltip: {
      text: 'Timer',
      shortcuts: ['G', 'T'],
    },
  },
  {
    id: 'home',
    label: 'Notes',
    icon: 'i-heroicons-pencil',
    to: '/',
    tooltip: {
      text: 'Home',
      shortcuts: ['G', 'H'],
    },
  },
  {
    id: 'customers',
    label: 'Customers / Companies',
    icon: 'i-heroicons-users',
    to: '/customers',
    tooltip: {
      text: 'Customers',
      shortcuts: ['G', 'C'],
    },
  },
  {
    id: 'projects',
    label: 'Projects / Tasks',
    icon: 'i-heroicons-briefcase',
    to: '/projects',
    tooltip: {
      text: 'Projects',
      shortcuts: ['G', 'P'],
    },
  },
  {
    id: 'history',
    label: 'History',
    icon: 'i-heroicons-clipboard',
    to: '/history',
    tooltip: {
      text: 'History',
      shortcuts: ['G', 'I'],
    },
  },
]



</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left> </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <!-- <UDashboardSearchButton /> -->
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <div class="flex-1" />

        <UDivider class="sticky bottom-0" />
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <ClientOnly>
    </ClientOnly>
  </UDashboardLayout>
</template>
