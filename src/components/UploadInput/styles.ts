import theme from 'src/theme'
import styled, { css } from 'styled-components'
import tw from 'tailwind-styled-components'
import { UploadInputProps } from '.'

const Container = styled.div`
  button {
    height: 75%;
  }
`

const DropArea = styled.div<Pick<UploadInputProps, 'disabled' | 'labelColor'>>`
  cursor: pointer;
  background-color: ${theme.colors.light};
  ${({ disabled, labelColor }) =>
    !!disabled &&
    labelColor &&
    css`
      cursor: not-allowed;
      background-color: ${theme.colors.lightGray};
      color: ${(disabled && theme.colors.light) ?? theme.colors[labelColor]};
    `}
`

export default {
  Container: tw(Container)`
    flex
    flex-col
    items-center
    md:flex-row
    gap-2
  `,
  DropArea: tw(DropArea)`
    border-2
    border-dashed
    text-center
    p-4
    rounded
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
