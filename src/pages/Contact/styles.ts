import tw from 'tailwind-styled-components'

export default {
  Description: tw.div`
    w-full
  `,
  MapWrapper: tw.div`
    rounded
    overflow-auto
    aspect-square
    w-full
    z-10
    p-24
    -my-16

    md:p-0
    md:m-0
  `
}
