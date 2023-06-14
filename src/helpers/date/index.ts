const stringToDateFormat = (dateString: string) => {
  return dateString.split(' - ').reverse().toString().replaceAll(',', '/')
}

const dateToStringFormat = (date: string | undefined) => {
  if (!date || !date.length) return
  return date.split('/').reverse().toString().replaceAll(',', ' - ')
}

export { stringToDateFormat, dateToStringFormat }
