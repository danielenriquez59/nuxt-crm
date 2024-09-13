export interface NoteData {
  body: string
  relatedCustomers: string[]
}

export function validateNote(note: NoteData): { isValid: boolean; validatedData?: NoteData } {
  const toast = useToast()
  const errors: string[] = []

  // Validate body
  if (typeof note.body !== 'string' || note.body.trim() === '') {
    errors.push('Note body must be a non-empty string')
  }

  if (errors.length > 0) {
    errors.forEach((error) => {
      toast.add({
        title: 'Validation Error',
        message: error,
        color: 'red',
      })
    })
    return { isValid: false }
  }

  return {
    isValid: true,
    validatedData: {
      body: note.body.trim(),
      relatedCustomers: note.relatedCustomers,
    },
  }
}
