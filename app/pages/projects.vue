<script setup>
import AddProjectForm from '~/components/projects/AddProjectForm.vue'
import AddTaskForm from '~/components/projects/AddTaskForm.vue'
import ProjectsTable from '~/components/projects/ProjectsTable.vue'
import TasksTable from '~/components/projects/TasksTable.vue'
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <AppNav />
      <UDashboardPanelContent class="bg-zinc-50 m-0 py-0 px-1 p-2">
        <div class="grid grid-cols-2 gap-4">
          <AddTaskForm class="col-span-2 md:col-span-1" />
          <AddProjectForm class="col-span-2 md:col-span-1" />
          <TasksTable class="col-span-2" />
          <ProjectsTable class="col-span-2" />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
