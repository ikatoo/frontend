import styled from 'styled-components'
import tw from 'tailwind-styled-components'

const Legend = styled.fieldset`
  legend {
    padding: 0 0.2rem;
  }
`

const RowWrapper = tw.div`
  flex
  flex-row
  gap-2
  min-w-[18.5rem]
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
  UploadWrapper: tw.div`
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
  `,
  LinkWrapper: tw.div`
    w-full
  `,
  RowWrapper,
  GithubDetails: tw.div`
    border-solid
    border-mck_gray_light
    border-2
    rounded
    p-2
    flex
    flex-col
    gap-0
  `,
  GithubLink: tw.a`
    relative
    -top-4
    text-center
    w-full
    m-0
    p-0
  `,
  DatesWrapper: tw(RowWrapper)`
    pt-2
  `
}
