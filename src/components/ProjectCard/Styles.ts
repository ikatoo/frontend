import theme from 'src/theme'
import styled from 'styled-components'
import tw from 'tailwind-styled-components'

export default {
  CardWrapper: tw.div`
    max-w-xs
`,
  CardActionsWrapper: tw.div`
  relative
`,
  CardActions: styled.div`
    position: absolute;
    width: 100%;
    padding-top: 0.4rem;
    padding-right: 0.4rem;
    display: flex;
    justify-content: right;
    gap: 0.5rem;

    svg {
      height: 1.75rem;
      cursor: pointer;
      padding: 0.4rem;
      background-color: ${theme.colors.black}80;
      border-radius: 50%;
    }
  `
}
