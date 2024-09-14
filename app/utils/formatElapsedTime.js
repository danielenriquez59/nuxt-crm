export const formatElapsedTime = (timeInMilliseconds) => {
  const totalSeconds = Math.floor(timeInMilliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const milliseconds = timeInMilliseconds % 1000

  return `${hours}h ${minutes}m ${seconds}s`
}

export const parseElapsedTime = (formattedTime) => {
  const regex = /(\d+)h\s+(\d+)m\s+(\d+)s/
  const match = formattedTime.match(regex)

  if (!match) {
    throw new Error('Invalid time format. Expected format: "Xh Ym Zs"')
  }

  const [, hours, minutes, seconds] = match.map(Number)

  const totalMilliseconds = (
    hours * 3600000 +
    minutes * 60000 +
    seconds * 1000
  )

  return Math.round(totalMilliseconds)
}
