import styled, { css } from 'styled-components'
import tw from 'tailwind-styled-components'
import { DataTableProps } from '.'
import theme from '../../theme'

type LabelProps = Pick<DataTableProps, 'labelColor'>

const Wrapper = tw.div`
  flex
  flex-col
`

const Label = styled.label<LabelProps>`
  ${({ labelColor }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    line-height: ${theme.spacings.xxxlarge};
    color: ${theme.colors[labelColor ?? 'black']};
    cursor: pointer;
  `}
`

const HorizontalOverflow = tw.div`
  overflow-x-auto
  sm:-mx-6
  lg:-mx-8
  max-w-full
`

const InlineBlock = tw.div`
  inline-block
  min-w-full
  py-2
  sm:px-6
  lg:px-8
`

const OverflowHidden = tw.div`overflow-hidden`

const Table = tw.table`min-w-full text-center text-sm font-light`

const TableHead = tw.thead`
  border-b
  bg-neutral-800
  font-medium
  text-white
  dark:border-neutral-500
  dark:bg-neutral-900
`

const RowHead = tw.th`px-6 py-4 uppercase`

const Row = tw.tr`border-b dark:border-neutral-500`

const Data = tw.td`
  whitespace-nowrap
  px-6
  py-4
  font-medium
  text-ellipsis
  overflow-hidden
  max-w-sm
`

export default {
  Label,
  Wrapper,
  HorizontalOverflow,
  InlineBlock,
  OverflowHidden,
  Table,
  TableHead,
  RowHead,
  Row,
  Data
}
