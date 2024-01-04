import theme from 'src/styles/theme'
import styled from 'styled-components'
import tw from 'tailwind-styled-components'

export default {
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
    text-mck_aqua
  `,
  Title: styled.h1`
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.mck_aqua};
    text-align: center;

    @media (min-width: 640px) {
      font-size: clamp(1rem, 3vw, 3rem);
      margin: 3.4rem 0 1rem;
      line-height: 1;
    }
  `
}
