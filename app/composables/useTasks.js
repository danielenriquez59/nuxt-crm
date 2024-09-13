import { useTaskStore } from '~/stores/tasks'
import { storeToRefs } from 'pinia'

export const useTasks = () => {
  const store = useTaskStore()
  const { tasks, loading, error } = storeToRefs(store)

  const fetchTasks = async () => {
    await store.fetchTasks()
  }

  const addTask = (task) => {
    store.addTask(task)
  }

  const updateTask = (task) => {
    store.updateTask(task)
  }

  const deleteTask = (task) => {
    store.deleteTask(task)
  }

  const getTaskById = (id) => {
    return store.getTaskById(id)
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
  }
}
