import styled, { css } from 'styled-components'

import { TextInputProps } from '.'
import theme from '../../theme'

type IconPositionProps = Pick<TextInputProps, 'iconPosition'>

type LabelProps = Pick<TextInputProps, 'labelColor'>

type WrapperProps = Pick<TextInputProps, 'disabled'> & { error?: boolean }

const InputWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.lightGray};
    border-radius: 0.2rem;
    padding: 0 ${theme.spacings.xsmall};
    border: 0.2rem solid;
    border-color: ${theme.colors.lightGray};

    &:focus-within {
      box-shadow: 0 0 0.5rem ${theme.colors.primary};
    }
  `}
`

const Input = styled.input<IconPositionProps>`
  ${({ iconPosition }) => css`
    color: ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.large};
    padding: ${theme.spacings.xsmall} 0;
    padding-${iconPosition}: ${theme.spacings.xsmall};
    background: transparent;
    border: 0;
    outline: none;
    width: ${iconPosition === 'right' ? `calc(100% - 2.2rem)` : `100%`};
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 ${theme.spacings.small}
        ${theme.colors.lightGray} inset;
      filter: none;
      &::first-line {
        font-family: ${theme.font.family};
        font-size: ${theme.font.sizes.large};
      }
    }
  `}
`

const Label = styled.label<LabelProps>`
  ${({ labelColor }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    line-height: ${theme.spacings.xxxlarge};
    color: ${theme.colors[labelColor ?? 'black']};
    cursor: pointer;
  `}
`

const Icon = styled.div<IconPositionProps>`
  ${({ iconPosition }) => css`
    display: flex;
    color: ${theme.colors.gray};
    order: ${iconPosition === 'right' ? 1 : 0};

    & > svg {
      width: 1.2rem;
      height: 100%;
    }
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
    ${InputWrapper} {
      border-color: ${theme.colors.red};
    }

    ${Icon},
    ${Label} {
      color: ${theme.colors.red};
    }
  `,
  disabled: () => css`
    ${Label},
    ${Input},
    ${Icon} {
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
  Wrapper,
  Error,
  Icon,
  Label,
  Input,
  InputWrapper
}
