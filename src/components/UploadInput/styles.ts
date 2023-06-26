import theme from 'src/theme'
import styled, { css } from 'styled-components'
import tw from 'tailwind-styled-components'

const Container = styled.div`
  button {
    height: 75%;
  }
`

export default {
  Container: tw(Container)`
    flex
    flex-col
    items-center
    md:flex-row
    gap-2
  `,
  DropArea: tw.div`
    bg-mck_light
    border-2
    border-dashed
    text-center
    p-4
    rounded
    cursor-pointer
  `,
  Error: styled.span`
    width: auto;
    color: ${theme.colors.red};
    opacity: 0%;
    transition-duration: 0s;
    transition-delay: 0s;

    ${(props) =>
      !!props.children &&
      css`
        transition-delay: 0.2s;
        transition-duration: 0.2s;
        top: 0px;
        opacity: 100%;
      `}
  `
}
