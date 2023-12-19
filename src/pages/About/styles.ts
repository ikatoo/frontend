import styled from 'styled-components'
import tw from 'tailwind-styled-components'

const ImageWrapper = styled.div`
  img {
    border-radius: 50%;
    max-width: 100%;
    max-height: 100%;
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
  Text: tw.div`
    flex
    flex-row
    md:w-full
  `,
  Skills: tw.div`
    flex
    md:w-full
    h-screen
    items-center
    justify-center
  `,
  ImageWrapper: tw(ImageWrapper)`
    md:flex
    justify-center
    items-center
    hidden
    h-screen
    md:w-full
  `
}
