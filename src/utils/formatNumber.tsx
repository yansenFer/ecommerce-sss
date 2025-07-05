export const addCommas = (num: string, comma: boolean = true) => {
  const parsedNum = parseFloat(num)
  if (isNaN(parsedNum)) return ''

  return parsedNum.toLocaleString('en-US', {
    minimumFractionDigits: comma ? 2 : 0,
    maximumFractionDigits: comma ? 2 : 0,
  })
}

export const removeNonNumeric = (num: string) => num.toString().replace(/[^0-9.]/g, '')
