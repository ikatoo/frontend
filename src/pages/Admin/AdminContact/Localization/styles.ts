import tw from 'tailwind-styled-components'

export default {
  Wrapper: tw.div`flex flex-col`,
  Label: tw.label`text-xl cursor-pointer`,
  Localization: tw.div`
    bg-mck_primary
    text-mck_aqua
    rounded
    text-center
    h-12
    flex
    flex-col
    items-center
    justify-center
    cursor-pointer
  `,
  Overlay: tw.div`
    inset-0
    absolute
    flex
    items-center
    justify-center
    z-10
    bg-black
    bg-opacity-50
  `,
  MapWrapper: tw.div`
    rounded
    overflow-auto
    h-96
    aspect-square
  `
}
