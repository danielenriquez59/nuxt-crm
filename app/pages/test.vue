<template>
    <div class="flex flex-col gap-4">
      <h1>Customer List</h1>
      <UButton @click="fetchCustomers" :disabled="loading">Refresh Customers</UButton>
      
      <div>{{ customers }}</div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <ul v-else-if="customers?.length > 0">
        <li v-for="customer in customers" :key="customer.id">
          {{ customer.name }} - {{ customer.email }}
          <UButton @click="() => updateCustomer({ ...customer, name: customer.name + ' (Updated)' })">Update</UButton>
          <UButton @click="() => deleteCustomer(customer.id)">Delete</UButton>
        </li>
      </ul>
      <div v-else>No customers found</div>
  
      <h2 class="font-bold">Add New Customer</h2>
      <form @submit.prevent="handleAddCustomer">
        <UInput v-model="newCustomer.name" placeholder="Name" required />
        <UInput v-model="newCustomer.email" placeholder="Email" required />
        <UButton type="submit">Add Customer</UButton>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useCustomers } from '~/composables/useCustomers'
  
  // Use the composable
  const { 
    customers, 
    loading, 
    error, 
    fetchCustomers, 
    addCustomer, 
    updateCustomer, 
    deleteCustomer 
  } = useCustomers()
  
  // New customer form data
  const newCustomer = ref({ name: '', email: '' })
  
  // Fetch customers when the component is mounted
  onMounted(() => {
    fetchCustomers()
  })
  
  // Handle adding a new customer
  const handleAddCustomer = () => {
    addCustomer(newCustomer.value)
    newCustomer.value = { name: '', email: '' } // Reset form
  }
  </script>