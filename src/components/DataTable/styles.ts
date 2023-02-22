import styled, { css } from 'styled-components'
import { DataTableProps } from '.'
import theme from '../../theme'

type LabelProps = Pick<DataTableProps, 'labelColor'>

const Label = styled.label<LabelProps>`
  ${({ labelColor }) => css`
    font-size: ${theme.font.sizes.large};
    color: ${theme.colors[labelColor ?? 'black']};
    cursor: pointer;
  `}
`

export default { Label }
