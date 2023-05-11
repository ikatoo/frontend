import tw from 'tailwind-styled-components'

type WrapperProps = {
  $stretch: boolean
}

export default {
  Wrapper: tw.div`
    ${(props: WrapperProps) => props.$stretch && 'h-full w-full'}
    grid
    bg-white
    shadow-md
    border
    border-gray-200
    rounded-lg
    dark:bg-gray-800
    dark:border-gray-700
  `,
  Image: tw.img`
    rounded-t-lg
  `,
  ContentWrapper: tw.div`
    text-slate-800
    dark:text-slate-100
    p-5
  `,
  Title: tw.h1`
    text-lg
    font-bold
  `,
  Subtitle: tw.h2`
    text-xs
    font-medium
    italic
    `,
  Content: tw.div`
    overflow-clip
    text-xs
    font-medium
  `
}
