import { useProjectStore } from '~/stores/projects'
import { storeToRefs } from 'pinia'

export const useProjects = () => {
  const store = useProjectStore()
  const { projects, loading, error } = storeToRefs(store)

  const fetchProjects = async () => {
    await store.fetchProjects()
  }

  const addProject = (project) => {
    store.addProject(project)
  }

  const updateProject = (project) => {
    store.updateProject(project)
  }

  const deleteProject = (project) => {
    store.deleteProject(project)
  }

  const getProjectById = (id) => {
    return store.getProjectById(id)
  }

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
  }
}