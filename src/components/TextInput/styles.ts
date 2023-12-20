import styled, { css } from 'styled-components'

import tw from 'tailwind-styled-components'
import { TextInputProps } from '.'
import theme from '../../theme'

type IconPositionProps = Pick<TextInputProps, 'iconPosition'>

type LabelProps = Pick<TextInputProps, 'labelColor'>

type WrapperProps = Pick<TextInputProps, 'disabled'>

const InputWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.lightGray};
    border-radius: 0.2rem;
    padding: 0 ${theme.spacings.xsmall};
    border: 0.2rem solid;
    border-color: ${theme.colors.lightGray};
    position: relative;
    z-index: 1;

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
    font-size: ${theme.font.sizes.large};
    color: ${theme.colors[labelColor ?? 'black']};
    cursor: pointer;
    text-wrap: nowrap;
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

const Error = styled.span<{ isEnabled: boolean }>`
  ${({ isEnabled }) => css`
    width: auto;
    background: ${theme.colors.red};
    opacity: 0%;
    position: relative;
    left: 0px;
    top: -25px;
    z-index: 0;
    pointer-events: auto;
    border-radius: 0 0 4px 4px;
    padding: 2px 4px;
    transition-duration: 0s;
    transition-delay: 0s;

    ${!!isEnabled &&
    css`
      transition-delay: 0.2s;
      transition-duration: 0.2s;
      top: 0px;
      opacity: 100%;
    `}
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
  width: 100%;
  ${({ disabled }) => css`
    ${disabled && wrapperModifiers.disabled()}
  `}
`

const Length = tw.span`
  absolute
  right-0
  -top-6
`

export default {
  Wrapper,
  Error,
  Icon,
  Label,
  Input,
  InputWrapper,
  Length
}
