export function errorHandler(errorref, item, type) {
    const toast = useToast()
    if (!errorref.value) {
      toast.add({
        title: `${item.charAt(0).toUpperCase() + item.slice(1)} ${type}`,
        message: `The ${item} has been ${type} successfully`,
        color: 'green',
    }) 
    } else {
      toast.add({
        title: 'Error',
        message: errorref.value,
        color: 'red',
      })
    }
}