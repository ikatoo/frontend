import styled from 'styled-components'
import tw from 'tailwind-styled-components'

const Legend = styled.fieldset`
  legend {
    padding: 0 0.2rem;
  }
`

const InlineButton = styled.div`
  button {
    height: 2.6rem;
    padding: 0;
  }
`

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
  TextWrapper: tw.div`
    py-2
    text-mck_gray_light
  `,
  Actions: tw.div`
    flex
    w-full
    items-center
    justify-center
    m-4
    gap-2
  `,
  Form: tw.form`
    flex
    flex-col
    gap-2
  `,
  FieldSet: tw(Legend)`
    max-w-full
    flex
    flex-wrap
    border-solid
    border-mck_gray_light
    border-2
    rounded
    p-2
  `,
  DateWrapper: tw.div`
    max-w-[100px]
    min-w-[100px]
  `,
  Full: tw.div`
    flex
    flex-row
    w-full
    min-w-full
    max-w-full
    gap-2
  `,
  Fill: tw.div`
    w-full
  `,
  InlineButton: tw(InlineButton)`
    self-center
  `
}
