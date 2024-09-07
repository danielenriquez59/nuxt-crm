export const formatCase = (str) => {
  if (typeof str !== 'string') return str

  // Handle camelCase
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2')

  // Handle snake_case
  str = str.replace(/_/g, ' ')

  // Capitalize first letter of each word
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
