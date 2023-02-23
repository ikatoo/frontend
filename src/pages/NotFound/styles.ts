import tw from 'tailwind-styled-components'

export default {
  Wrapper: tw.div`
    w-screen
    h-screen
    flex
    flex-col
    justify-center
    items-center
    g-6
    text-gray-300
  `,
  Code: tw.h1`
    text-9xl
  `,
  Message: tw.h3`
  text-xl
  `,
  Image: tw.Image`
    w-48
  `
}
