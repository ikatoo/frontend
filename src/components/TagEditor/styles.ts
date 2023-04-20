import styled, { css } from 'styled-components'
import theme from '../../theme'

type AlertProps = {
  isEnabled: boolean
}

export default {
  TagsWrapper: styled.div`
    line-height: 30px;
  `,
  DeleteButton: styled.button`
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
  Alert: styled.span<AlertProps>`
    background: ${theme.colors.red};
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;

    ${({ isEnabled }) =>
      isEnabled &&
      css`
        transition-delay: 4s;
        transform: translateY(0);
      `}
  `
}
