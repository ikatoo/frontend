import tw from 'tailwind-styled-components'

export default {
  Wrapper: tw.div`
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
    ${(props: { $heightInRem: number }) =>
      props.$heightInRem &&
      `
        h-[${props.$heightInRem}rem]
    `}
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
