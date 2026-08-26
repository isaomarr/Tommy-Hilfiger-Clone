export const memberIdFor = (id) => {
  let hash = 0
  const str = String(id)
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return `TH${hash.toString().padStart(10, '0').slice(0, 10)}`
}
