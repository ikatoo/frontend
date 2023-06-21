import theme from 'src/theme'
import styled from 'styled-components'
import tw from 'tailwind-styled-components'

const StyledInlineButton = styled.div`
  button {
    height: 2.6rem;
    padding: 0 1.75rem;
    width: 100%;
  }
`

export default {
  Hidden: tw.div`
    hidden
  `,
  InlineButton: tw(StyledInlineButton)`
    w-full
    md:w-fit
    self-center
  `,
  FileArea: tw.label`
    bg-slate-300
    block
    cursor-pointer
    `,
  DropZone: styled.div`
    padding: 1.25rem 0.75rem;
    background-color: aqua;
    /* py-3
    px-5
    h-full
    w-full
    bg-mck_primary */
  `
}
