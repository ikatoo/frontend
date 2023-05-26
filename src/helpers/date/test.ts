import { dateToStringFormat, stringToDateFormat } from '.'

describe('Date helper', () => {
  test('should receive in string format and return to date format', () => {
    const stringFormat = '2022 - 03'
    const dateFormat = stringToDateFormat(stringFormat)

    expect(dateFormat).toBe('03/2022')
  })

  test('should receive in date format and return to string format', () => {
    const stringFormat = '03/2022'
    const dateFormat = dateToStringFormat(stringFormat)

    expect(dateFormat).toBe('2022 - 030000')
  })
})
