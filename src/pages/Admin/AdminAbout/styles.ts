import styled from 'styled-components'
import tw from 'tailwind-styled-components'

const Legend = styled.fieldset`
  legend {
    padding: 0 0.2rem;
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
  `,
  Form: tw.form`
    flex
    flex-col
    gap-2
  `,
  FieldSet: tw(Legend)`
    border-solid
    border-mck_gray_light
    border-2
    rounded
    p-2
  `
}
