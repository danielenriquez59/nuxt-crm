import { defineStore } from 'pinia'
import { ref } from 'vue'

interface LastUpdate {
  description: string
  time: string
}

export const useLastUpdateStore = defineStore('lastUpdate', () => {
  const lastUpdate = ref<LastUpdate | null>(null)

  function setLastUpdate(update: LastUpdate) {
    lastUpdate.value = update
  }

  function getLastUpdate(): LastUpdate | null {
    return lastUpdate.value
  }

  return {
    lastUpdate,
    setLastUpdate,
    getLastUpdate
  }
})