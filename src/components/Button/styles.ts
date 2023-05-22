import tw from 'tailwind-styled-components'

const type = {
  primary: `
    text-white
    bg-blue-800
    hover:bg-mck_aqua
    hover:text-slate-800
    focus:bg-blue-700
    active:bg-blue-800
  `,
  secondary: `
    text-mck_aqua
    bg-slate-800
    hover:bg-mck_aqua
    hover:text-slate-800
    focus:bg-blue-700
    active:bg-blue-800
  `,
  default: `
    text-black
    bg-gray-500
  `
}

export default {
  Wrapper: tw.button`
    flex
    flex-row
    justify-center
    items-center
    gap-4
    px-7
    py-3
    ${(props: { $styleType: 'primary' | 'secondary' | 'default' }) =>
      type[props.$styleType]}
    font-medium
    text-sm
    leading-snug
    uppercase
    rounded
    shadow-mck_black
    shadow
    hover:shadow-md
    focus:shadow-md
    focus:ring-0
    active:shadow-md
    transition
    duration-150
    ease-in-out
    ${(props: { $block: boolean }) => !!props.$block && 'w-full'}
    disabled:bg-mck_black
    disabled:text-mck_gray_dark
  `,
  IconWrapper: tw.div`
    flex
    flex-col
    w-5
    h-full
  `
}
