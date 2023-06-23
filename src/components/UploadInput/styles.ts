import styled from 'styled-components'
import tw from 'tailwind-styled-components'

const ButtonInsideLabel = styled.label`
  /* button {
    pointer-events: none;
    z-index: 90;
  } */
`

export default {
  Container: tw.div`
    bg-blue-400
  `,
  UploadHide: tw.input`
    bg-red-400
    cursor-pointer
    absolute
    opacity-0
  `,
  UploadLabel: tw(ButtonInsideLabel)`
    bg-yellow-400
    absolute
    max-w-3xl
    aspect-auto
    p-5
    border-dashed
    border-mck_light
    border
    flex
    justify-center
    flex-col
    md:flex-row
    text-center
    rounded-lg
    items-center
    gap-2
    cursor-pointer
    pointer-events-none
  `,
  Message: tw.span``
}
