import styled from 'styled-components'
import tw from 'tailwind-styled-components'

const clampSpan = styled.h1`
  font-size: clamp(1rem, 3vw, 3rem);
  line-height: 1;
`

export default {
  Wrapper: tw.div`
    w-[-webkit-fill-available]
  `,
  HtmlBackground: tw.div`
    font-indie_flower
    text-slate-700
    font-bold
    before:content-['<html>']
    after:content-['</html>']
  `,
  BodyBackground: tw.div`
    before:content-['<body>']
    after:content-['</body>']
    ml-4
  `,
  HeaderBackground: tw.div`
    before:content-['<header>']
    after:content-['</header>']
    ml-4
    mb-4
    flex
    flex-col
  `,
  Title: tw(clampSpan)`
    ml-4
    font-body
    text-5xl
    text-mck_aqua
  `,
  MainBackground: tw.div`
    before:content-['<main>']
    after:content-['</main>']
    ml-4
  `,
  Content: tw.div`
    ml-4
    text-gray-200
    mb-2
    font-body
    font-normal
  `
}
