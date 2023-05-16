import tw from 'tailwind-styled-components'

export const Calendar = tw.table`
  rounded-b
  py-0
  px-2
  border-mck_gray_light
  border-[0.2rem]
  bg-mck_gray_light
  w-full
  min-w-fit
`

export const MonthHeader = tw.thead`
  flex
  flex-row
  justify-between
  items-center
`

export const WeekHeader = tw.th`
  flex
  flex-row
  justify-between
  items-center
`

export const Date = tw.div`
  p-2
`
