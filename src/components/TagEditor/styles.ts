import styled from 'styled-components'
import theme from '../../theme'

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
  `
}
