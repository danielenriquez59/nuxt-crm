<template>
  <UDashboardNavbar title="Home"> </UDashboardNavbar>
</template>

<script lang="ts" setup>
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

<style></style>
