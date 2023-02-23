import styled, { css } from 'styled-components'

import { TagInputProps } from '.'
import theme from '../../theme'
import tw from 'tailwind-styled-components/dist/tailwind'

type LabelProps = Pick<TagInputProps, 'labelColor'>

type WrapperProps = Pick<TagInputProps, 'disabled'> & { error?: boolean }

const InputWrapper = styled.div`
  ${() => css`
    display: flex;
    flex-wrap: wrap;
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

const Input = styled.input`
  color: ${theme.colors.black};
  font-family: ${theme.font.family};
  font-size: ${theme.font.sizes.large};
  padding: ${theme.spacings.xsmall} 0;
  padding-left: ${theme.spacings.xsmall};
  background: transparent;
  border: 0;
  outline: none;
  max-width: 5rem;
  margin: 0.2rem;
  border-style: dashed;
  border-width: thin;
  border-radius: ${theme.border.radius};
  border-color: transparent;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 ${theme.spacings.small} ${theme.colors.lightGray}
      inset;
    filter: none;
    &::first-line {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.large};
    }
  }

  &:focus {
    border-color: ${theme.colors.gray};
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
    ${InputWrapper} {
      border-color: ${theme.colors.red};
    }

    ${Label} {
      color: ${theme.colors.red};
    }
  `,
  disabled: () => css`
    ${Label},
    ${Input} {
      cursor: not-allowed;
      color: ${theme.colors.gray};

      &::placeholder {
        color: currentColor;
      }
    }
  `
}

const TagsWrapper = tw.div`
  flex
  flex-wrap
  gap-1
`

const Tag = styled.div`
  display: flex;
  padding: 0.3rem;
  background-color: ${theme.colors.gray};
  color: ${theme.colors.lightGray};
  border-radius: ${theme.border.radius};

  svg {
    margin: auto;
    padding-left: 0.2rem;
  }
`

const Wrapper = styled.div<WrapperProps>`
  ${({ error, disabled }) => css`
    ${error && wrapperModifiers.error()}
    ${disabled && wrapperModifiers.disabled()}
  `}
`

const CloseWrapper = tw.span`cursor-pointer`

export default {
  Wrapper,
  Error,
  Label,
  Input,
  InputWrapper,
  TagsWrapper,
  Tag,
  CloseWrapper
}
