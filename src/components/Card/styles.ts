import tw from 'tailwind-styled-components'

export default {
  Wrapper: tw.div`
    w-80
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
    aspect-video
    object-none
  `,
  InfoWrapper: tw.div`
    w-full
    text-slate-800
    dark:text-slate-100
    p-2
    m-2
    flex
    flex-col
    gap-2
  `,
  BottomWrapper: tw.div`
    flex
  `,
  Title: tw.h1`
    text-xl
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
  `,
  Description: tw.div`
    flex
    flex-col
    gap-0
  `,
  Tags: tw.div`
    w-full
    max-w-full
    flex
    flex-wrap
    text-center
    justify-center
    items-center
    p-2
    m-2
    border
    border-dashed
    text-sm
    capitalize
    gap-2
    rounded
  `,
  Tag: tw.div`
    h-fit
  `
}
