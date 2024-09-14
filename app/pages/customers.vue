<script setup>
const { fetchCustomers } =  useCustomers()
const {  fetchCompanies } = useCompanies()
fetchCompanies()
fetchCustomers()
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <AppNav />
      <UDashboardPanelContent class="bg-zinc-50 m-0 py-0 px-1 p-2">
        <div class="grid grid-cols-2 gap-4">
          <AddCompanyForm class="col-span-2 md:col-span-1" />
          <AddCustomerForm class="col-span-2 md:col-span-1" />
          <CustomersTable class="col-span-2" />
          <CompaniesTable class="col-span-2" />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
