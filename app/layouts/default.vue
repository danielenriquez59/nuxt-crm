<script setup lang="ts">
const route = useRoute()
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


const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.map((link) => ({ ...link, shortcuts: link.tooltip?.shortcuts })),
  },
  {
    key: 'code',
    label: 'Code',
    commands: [
      {
        id: 'source',
        label: 'View page source',
        icon: 'i-simple-icons-github',
        click: () => {
          window.open(
            `https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`,
            '_blank'
          )
        },
      },
    ],
  },
]

const defaultColors = ref(
  ['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map((color) => ({
    label: color,
    chip: color,
    click: () => (appConfig.ui.primary = color),
  }))
)
const colors = computed(() =>
  defaultColors.value.map((color) => ({ ...color, active: appConfig.ui.primary === color.label }))
)
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
        </template>
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
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
