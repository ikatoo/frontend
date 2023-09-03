import theme from 'src/theme'
import styled from 'styled-components'
import { Container } from '../SignIn/styles'

export default {
  Page: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.white};

    @media (max-height: 768px) {
      scale: 90%;
    }
  `,
  Container,
  LogoWrapper: styled.div`
    width: fit-content;
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
    gap: 1.5rem;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 0.5rem;
    }

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
    flex-wrap: nowrap;
    justify-content: space-between;
    border-radius: 4px;
    border: 2px solid ${theme.colors.light};
    border-style: dashed;
    width: 100%;
    padding: 0.5rem;
    gap: 1rem;

    button {
    }
    /*
    gap: 1rem;

    button {
      padding: 0.7rem;
      min-width: 7rem;
    }
    */
  `,
  Legend: styled.legend`
    padding: 3px;
  `
}
