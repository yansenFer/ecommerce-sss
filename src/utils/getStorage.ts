export const getStorage = (name: string, isArray: boolean) => {
  if (isArray) {
    const dataRaw = localStorage.getItem(name)
    const data = dataRaw ? JSON.parse(dataRaw) : []
    return data
  } else {
    const dataRaw = localStorage.getItem(name)
    return dataRaw
  }
}
