import styled, { css } from 'styled-components'

import { CheckboxProps } from '.'
import theme from '../../styles/theme'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 0.2rem solid ${theme.colors.darkGray};
  border-radius: 0.2rem;
  transition: background border ${theme.transition.fast};
  position: relative;
  outline: none;

  &:before {
    content: '';
    width: 0.3rem;
    height: 0.6rem;
    border: 0.15rem solid ${theme.colors.white};
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg);
    position: absolute;
    top: 0.1rem;
    opacity: 0;
    transition: ${theme.transition.fast};
  }

  &:focus {
    box-shadow: 0 0 0.5rem ${theme.colors.primary};
  }

  &:hover {
    border-color: ${theme.colors.gray};
    transition: ${theme.transition.fast};
  }

  &:checked {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary};

    &:before {
      opacity: 1;
    }
  }
`

const Label = styled.label<Pick<CheckboxProps, 'labelColor'>>`
  ${({ labelColor }) => css`
    cursor: pointer;
    padding-left: ${theme.spacings.xxsmall};
    ${!!labelColor && `color: ${theme.colors[labelColor]};`}
    line-height: 1.8rem;
  `}
`

export default {
  Label,
  Input,
  Wrapper
}
