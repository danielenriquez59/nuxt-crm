<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()

const links = [
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
    label: 'Customers',
    icon: 'i-heroicons-users',
    to: '/customers',
    tooltip: {
      text: 'Customers',
      shortcuts: ['G', 'C'],
    },
  },
  {
    id: 'history',
    label: 'History',
    icon: 'i-heroicons-clock',
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
          <TeamsDropdown />
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
