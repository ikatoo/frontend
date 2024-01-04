import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

type AlertProps = {
  isEnabled: boolean
}

export default {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  TagsWrapper: styled.div`
    position: relative;
    top: -20px;
    display: flex;
    gap: 2px;
  `,
  DeleteButton: styled.a`
    cursor: pointer;
    svg {
      color: ${theme.colors.lightGray};
    }
  `,
  Tag: styled.span`
    border-radius: 3px;
    background-color: ${theme.colors.secondary};
    margin: 0px;
    padding: 2px 4px;
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
