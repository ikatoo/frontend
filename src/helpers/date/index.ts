const stringToDateFormat = (dateString: string) => {
  return dateString.split(' - ').reverse().toString().replaceAll(',', '/')
}

const dateToStringFormat = (date: string | undefined) => {
  if (!date) {
    const newDate = new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric'
    })
    return newDate.split('/').reverse().toString().replaceAll(',', ' - ')
  }
  return date.split('/').reverse().toString().replaceAll(',', ' - ')
}

export { stringToDateFormat, dateToStringFormat }
