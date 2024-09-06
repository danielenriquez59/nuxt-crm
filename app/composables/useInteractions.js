import { useInteractionStore } from '~/stores/interactions'
import { storeToRefs } from 'pinia'

export const useInteractions = () => {
  const store = useInteractionStore()
  const { interactions, loading, error } = storeToRefs(store)

  const fetchInteractions = async () => {
    await store.fetchInteractions()
  }

  const addInteraction = (interaction) => {
    store.addInteraction(interaction)
  }

  const updateInteraction = (interaction) => {
    store.updateInteraction(interaction)
  }

  const deleteInteraction = (interactionId) => {
    store.deleteInteraction(interactionId)
  }

  const getInteractionById = (id) => {
    return store.getInteractionById(id)
  }

  return {
    interactions,
    loading,
    error,
    fetchInteractions,
    addInteraction,
    updateInteraction,
    deleteInteraction,
    getInteractionById,
  }
}
