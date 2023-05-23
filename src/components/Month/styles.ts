import theme from 'src/theme'
import styled, { css } from 'styled-components'
import tw from 'tailwind-styled-components'

export const Calendar = styled.div`
  border: 0 0 2.5rem;
  border: 0.2rem solid ${theme.colors.lightGray};
  width: 100%;
  min-width: fit-content;

  table {
    width: 100%;

    tr {
      td {
        text-align: center;
        padding: 0.5rem 0.2rem;
      }
    }
  }
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.darkGray};
  color: ${theme.colors.lightGray};
  padding: 0.5rem 0;
  font-size: ${theme.font.sizes.xlarge};
`

export const ChangeMonth = tw.span`
  cursor-pointer
`

export const YearMonth = tw.span`
  cursor-pointer
  flex
  flex-col
  text-center
`

export const WeekHeader = styled.th`
  background-color: ${theme.colors.gray};
  padding: 0.25rem 0;
`

type DayProps = {
  disabled: boolean
}

export const Day = styled.td<DayProps>`
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.black};
  font-weight: ${theme.font.bold};
  cursor: pointer;

  ${({ disabled }) => css`
    ${disabled &&
    css`
      font-weight: ${theme.font.light};
    `}
  `}
`

export const Month = styled.td`
  cursor: pointer;
`