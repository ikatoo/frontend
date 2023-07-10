import tw from 'tailwind-styled-components'

export default {
  Wrapper: tw.div`
    text-center
    flex flex-col
    gap-1
    ${(props: { $timeAnimation: number }) =>
      `transition-all
        ease-linear
        duration-[${props.$timeAnimation}ms]
      `}
  `,
  WrapperBar: tw.div`
    h-px
    bg-slate-600
  `,
  Bar: tw.div`
    h-full
    bg-mck_aqua
    ${(props: { $animated: boolean }) =>
      props.$animated &&
      `
        w-0
    `}
  `
}
