import { defineStore } from 'pinia'

interface TableHistory {
  tableName: string
  updatedAt: Date[]
}

export const useHistoryStore = defineStore('history', {
  state: () => ({}),

  actions: {
    async fetchHistory() {
      try {
        const { data } = await useFetch('/api/history')
        console.log('this is the data', data.value)
        if (data.value) {
          this.tableHistories = (data.value as TableHistory[]).filter(Boolean)
          this.lastFetched = new Date()
        }
      } catch (error) {
        console.error('Error fetching history:', error)
      }
    },
  },

  getters: {
    getHistoryForTable: (state) => {
      return (tableName: string) => state.tableHistories.find((th) => th.tableName === tableName)
    },
    getAllTableNames: (state) => {
      return state.tableHistories.map((th) => th.tableName)
    },
  },
})
