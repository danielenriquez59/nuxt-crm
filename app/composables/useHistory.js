import { ref, computed } from 'vue'
import { useHistoryStore } from '~/stores/history'

export function useHistory() {
  const historyStore = useHistoryStore()
  const loadedCount = ref(10)

  const fetchHistory = async () => {
    await historyStore.fetchHistory()
  }

  const sortedEvents = computed(() => {
    if (!historyStore.tableHistories) return []

    return historyStore.tableHistories.flatMap(table => 
      table.updatedAt.map(date => ({
        tableName: table.tableName,
        updatedAt: new Date(date)
      }))
    ).sort((a, b) => b.updatedAt - a.updatedAt)
     .slice(0, loadedCount.value)
     .map(event => ({
       description: `${event.tableName.slice(0, -1)} updated`,
       time: event.updatedAt.toLocaleString()
     }))
  })

  const loadMore = () => {
    loadedCount.value += 10
  }

  const hasMoreEvents = computed(() => {
    const totalEvents = historyStore.tableHistories?.reduce((sum, table) => sum + table.updatedAt.length, 0) || 0
    return loadedCount.value < totalEvents
  })

  const getHistoryForTable = (tableName) => {
    return historyStore.getHistoryForTable(tableName)
  }

  const allTableNames = computed(() => historyStore.getAllTableNames)

  const tableHistories = computed(() => historyStore.tableHistories)

  const lastFetched = computed(() => historyStore.lastFetched)

  return {
    fetchHistory,
    getHistoryForTable,
    allTableNames,
    lastFetched,
    tableHistories,
    sortedEvents,
    loadMore,
    hasMoreEvents
  }
}