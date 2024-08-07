import styled, { css } from 'styled-components'
import theme from '../theme'

type LabelProps = {
  $labelColor?: 'black' | 'white'
}

const Label = styled.label<LabelProps>`
  ${({ $labelColor }) => css`
    font-size: ${theme.font.sizes.large};
    color: ${theme.colors[$labelColor ?? 'black']};
    cursor: pointer;
  `}
`

export default Label
