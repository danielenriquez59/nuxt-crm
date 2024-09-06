import { useNoteStore } from '~/stores/notes'
import { storeToRefs } from 'pinia'

export const useNotes = () => {
  const store = useNoteStore()
  const { notes, loading, error } = storeToRefs(store)

  const fetchNotes = async () => {
    await store.fetchNotes()
  }

  const addNote = (note) => {
    store.addNote(note)
  }

  const updateNote = (note) => {
    store.updateNote(note)
  }

  const deleteNote = (noteId) => {
    store.deleteNote(noteId)
  }

  const getNoteById = (id) => {
    return store.getNoteById(id)
  }

  return { 
    notes, 
    loading, 
    error, 
    fetchNotes, 
    addNote, 
    updateNote, 
    deleteNote, 
    getNoteById 
  }
}