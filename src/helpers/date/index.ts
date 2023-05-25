const stringToDateFormat = (dateString: string) => {
  return dateString.split(' - ').reverse().toString().replaceAll(',', '/')
}

const dateToStringFormat = (date: string) => {
  return date.split('/').reverse().toString().replaceAll(',', ' - ')
}

export { stringToDateFormat, dateToStringFormat }
