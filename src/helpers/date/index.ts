/**
 * Ex: '2022 - 03' -> '03/2022'
 */
const stringToDateFormat = (dateString: string) => {
  return dateString.split(' - ').reverse().toString().replaceAll(',', '/')
}

/**
 * Ex: '03/2022' -> '2022 - 03'
 */
const dateToStringFormat = (date: string | undefined) => {
  if (!date || !date.length) return
  return date.split('/').reverse().toString().replaceAll(',', ' - ')
}

export { dateToStringFormat, stringToDateFormat }
