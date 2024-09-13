export const formatElapsedTime = (timeInMilliseconds) => {
  const totalSeconds = Math.floor(timeInMilliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const milliseconds = timeInMilliseconds % 1000

  return `${hours}h ${minutes}m ${seconds}s`
}
