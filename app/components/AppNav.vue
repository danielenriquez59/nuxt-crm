<script setup lang="ts">
const { isNotificationsSlideoverOpen } = useDashboard()

const items = [
  [
    {
      label: 'New mail',
      icon: 'i-heroicons-paper-airplane',
      to: '/inbox',
    },
    {
      label: 'New user',
      icon: 'i-heroicons-user-plus',
      to: '/users',
    },
  ],
]
</script>
<template>
  <UDashboardNavbar title="Home">
  </UDashboardNavbar>
</template>
