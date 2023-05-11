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
  CloseButton: tw.div`
    absolute
    w-7
    h-7
    m-1
  `
}
