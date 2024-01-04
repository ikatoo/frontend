import styled, { css } from 'styled-components'
import tw from 'tailwind-styled-components'

import { EditorProps } from '.'
import theme from '../../styles/theme'

type LabelProps = Pick<EditorProps, 'labelColor'>

type WrapperProps = { error?: boolean }

const EditorWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.lightGray};
    border-radius: 0.2rem;
    border: 0.2rem solid;
    border-color: ${theme.colors.lightGray};

    &:focus-within {
      box-shadow: 0 0 0.5rem ${theme.colors.primary};
    }
  `}
`

const Label = styled.label<LabelProps>`
  ${({ labelColor }) => css`
    font-size: ${theme.font.sizes.large};
    color: ${theme.colors[labelColor ?? 'black']};
    cursor: pointer;
  `}
`

const Error = styled.p`
  ${() => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.xsmall};
  `}
`

const wrapperModifiers = {
  error: () => css`
    ${EditorWrapper} {
      border-color: ${theme.colors.red};
    }

    ${Label} {
      color: ${theme.colors.red};
    }
  `,
  disabled: () => css`
    ${Label}
  `
}

const Wrapper = styled.div<WrapperProps>`
  ${({ error }) => css`
    ${error && wrapperModifiers.error()}
  `}
`

export default {
  Wrapper: tw(Wrapper)`
    max-w-full
    h-full
    max-h-full
  `,
  Error,
  Label,
  EditorWrapper: tw(EditorWrapper)`
    text-mck_black
  `
}
