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
    flex
    flex-col
    md:flex-row
    gap-2

  `,
  Title: tw.div`
    w-full
    min-w-[18.5rem]
  `,
  DatesWrapper: tw.div`
    flex
    flex-row
    gap-2
    min-w-[18.5rem]
  `,
  FieldSet: tw(Legend)`
    max-w-full
    flex
    flex-wrap
    justify-evenly
    items-center
    gap-10
    border-solid
    border-mck_gray_light
    border-2
    rounded
    p-2
  `,
  CardWrapper: tw.div`
    max-w-xs
  `,
  UploadWrapper: tw.div`
    w-fit
    self-center
  `,
  UploadDropArea: tw.div`
    flex
    flex-row
    flex-nowrap
    items-center
    gap-2
  `,
  Thumbnail: tw.img`
    h-14
    rounded
    border
    border-mck_gray_light
    border-spacing-1
  `
}
