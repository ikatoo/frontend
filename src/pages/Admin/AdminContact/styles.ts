import tw from 'tailwind-styled-components'

export default {
  Wrapper: tw.div`
    flex
    flex-col
    md:flex-row
    md:items-start
    bg-mck_black_light
    min-h-screen
    min-w-screen

    items-start
    ml-4
    md:mt-0
    md:pt-4
    mt-16
    pt-4
    pr-4
  `,
  Actions: tw.div`
    flex
    w-full
    items-center
    justify-center
    m-4
    gap-2
  `,
  Fill: tw.div`
    w-full
    flex
    flex-col
    sm:flex-row
    gap-2
  `,
  Title: tw.div`
    w-full
    min-w-[18.5rem]
  `
}
