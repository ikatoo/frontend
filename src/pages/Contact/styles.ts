import styled from 'styled-components'

export default {
  Description: styled.div`
    width: 100%;
    height: 100vh;
  `,
  AditionalContent: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  MapWrapper: styled.div`
    border-radius: 0.25rem;
    overflow: auto;
    margin-top: -4rem;
    margin-bottom: -4rem;
    width: 16rem;
    height: 16rem;
    z-index: 0;

    @media (min-width: 768px) {
      padding: 0px;
      margin: 0px;
      display: flex;
      justify-content: center;
    }
  `
}
