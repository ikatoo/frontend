import tw from 'tailwind-styled-components'

export default {
  Wrapper: tw.div`
    flex
    flex-col
    w-full
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
  Title: tw.span`
    ml-4
    text-5xl
    font-body
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
