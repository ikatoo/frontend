import styled, { css } from 'styled-components'
import theme from '../../theme'

type AlertProps = {
  isEnabled: boolean
}

export default {
  TagsWrapper: styled.div`
    line-height: 30px;
  `,
  DeleteButton: styled.a`
    cursor: pointer;
    svg {
      color: ${theme.colors.lightGray};
    }
  `,
  Tag: styled.span`
    border-radius: 10%;
    background-color: ${theme.colors.secondary};
    margin: 4px;
    padding: 2px;
    white-space: nowrap;
  `,
  InputWrapper: styled.div`
    position: relative;
    z-index: 1;
  `,
  Alert: styled.span<AlertProps>`
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

    ${({ isEnabled }) =>
      isEnabled &&
      css`
        transition-delay: 0.2s;
        transition-duration: 0.2s;
        top: 0px;
        opacity: 100%;
      `}
  `
}
