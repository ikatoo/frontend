import tw from 'tailwind-styled-components'

const Styles = {
  Spinner: tw.div`
    w-10
    h-10
    border-4
    border-solid
    border-sky-500
    border-t-4
    border-t-transparent
    rounded-full
    animate-spin
  `,
  Page: tw.div`
    absolute
    flex
    items-center
    justify-center
    inset-0
  `
}

export default Styles
