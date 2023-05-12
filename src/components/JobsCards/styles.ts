import tw from 'tailwind-styled-components'

export default {
  JobsWrapper: tw.div`
    w-full
    flex
    flex-col
    gap-6
  `,
  Subtitle: tw.h2`
    text-mck_aqua
    text-2xl
  `,
  Jobs: tw.div`
    flex
    flex-row
    flex-1
    gap-4
  `,
  ButtonWrapper: tw.div`
    relative
    cursor-pointer
  `,
  RemoveJobButton: tw.div`
    absolute
    right-0
    text-mck_red
    w-7
    h-7
    m-1
  `
}
