import styled, { css } from 'styled-components'
import tw from 'tailwind-styled-components'

import { TextAreaProps } from '.'
import theme from '../../theme'

type LabelProps = Pick<TextAreaProps, 'labelColor'>

type WrapperProps = Pick<TextAreaProps, 'disabled'> & { error?: boolean }

const ElementWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.lightGray};
    border-radius: 0.2rem;
    padding: 0 0 0 ${theme.spacings.xsmall};
    border: 0.2rem solid;
    border-color: ${theme.colors.lightGray};

    &:focus-within {
      box-shadow: 0 0 0.5rem ${theme.colors.primary};
    }
  `}
`

const Element = styled.textarea`
  color: ${theme.colors.black};
  font-family: ${theme.font.family};
  font-size: ${theme.font.sizes.large};
  padding: ${theme.spacings.xsmall} 0;
  background: transparent;
  border: 0;
  outline: none;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 ${theme.spacings.small} ${theme.colors.lightGray}
      inset;
    filter: none;
    &::first-line {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.large};
    }
  }
`

const Label = styled.label<LabelProps>`
  ${({ labelColor }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    line-height: ${theme.spacings.xxxlarge};
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
    ${ElementWrapper} {
      border-color: ${theme.colors.red};
    }

    ${Label} {
      color: ${theme.colors.red};
    }
  `,
  disabled: () => css`
    ${Label},
    ${Element} {
      cursor: not-allowed;
      color: ${theme.colors.gray};

      &::placeholder {
        color: currentColor;
      }
    }
  `
}

const Wrapper = styled.div<WrapperProps>`
  ${({ error, disabled }) => css`
    ${error && wrapperModifiers.error()}
    ${disabled && wrapperModifiers.disabled()}
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
  Element: tw(Element)`
    w-full
    max-h-[50vh]
    overflow-y-auto
  `,
  ElementWrapper
}
