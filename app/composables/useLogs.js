import { useLogStore } from '~/stores/logs'
import { storeToRefs } from 'pinia'

export const useLogs = () => {
  const store = useLogStore()
  const { logs, loading, error } = storeToRefs(store)

  const fetchLogs = async () => {
    await store.fetchLogs()
  }

  const addLog = (log) => {
    return store.addLog(log)
  }

  const updateLog = (log) => {
    return store.updateLog(log)
  }

  const deleteLog = (log) => {
    return store.deleteLog(log)
  }

  const getLogById = async (id) => {
    return await store.fetchLog(id)
  }

  return {
    logs,
    loading,
    error,
    fetchLogs,
    addLog,
    updateLog,
    deleteLog,
    getLogById,
  }
}