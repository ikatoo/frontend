import theme from 'src/theme'
import styled from 'styled-components'

export default {
  Page: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    min-width: fit-content;
    margin: auto;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    border-radius: 5px;
    border: 3px solid ${theme.colors.light};
  `,
  LogoWrapper: styled.div`
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    background-color: ${theme.colors.black};
    padding: 1rem;
    border-radius: 50%;
  `,
  InputWrapper: styled.div`
    width: 100%;

    div {
      display: flex;
      flex-direction: column;
    }
  `,
  OptionsWrapper: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    a {
      color: ${theme.colors.light};
      text-align: right;
      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  `,
  SocialLogin: styled.fieldset`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 1rem;
    border-radius: 4px;
    border: 2px solid ${theme.colors.light};
    border-style: dashed;
    padding: 0.5rem;

    button {
      padding: 0.7rem;
      min-width: 7rem;
    }
  `
}
