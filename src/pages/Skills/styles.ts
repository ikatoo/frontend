import tw from 'tailwind-styled-components'

export default {
  Wrapper: tw.div`
    flex
    flex-col
    md:flex-row
    md:items-start
    ml-4
    pr-4
    md:pt-4
  `,
  Text: tw.div`
    flex
    flex-row
    w-full
  `,
  Skills: tw.div`
    flex
    flex-col
    gap-16
    md:w-1/2
    h-full
    mt-20
    m-4
  `,
  Progress: tw.div`
    w-full
    flex
    flex-col
    gap-4
  `,
  Subtitle: tw.h2`
    text-mck_aqua
    text-2xl
  `,
  Projects: tw.div`
    flex
    flex-wrap
    w-full
    justify-center
    gap-4
    mt-4
    mb-4
  `
}
