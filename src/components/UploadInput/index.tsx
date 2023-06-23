import { useState } from 'react'
import Button from '../Button'
import Styles from './styles'

export type UploadInputProps = {
  name: string
  placeholder: string
  label: string
  labelColor: string
  uploadFn?: () => void
}

const UploadInput = (props: UploadInputProps) => {
  const [widthInput, setLarguraInput] = useState('')
  const [heightInput, setAlturaInput] = useState('')

  const updateInput = (element: HTMLLabelElement) => {
    if (element) {
      const width = element.offsetWidth
      const height = element.offsetHeight
      setLarguraInput(`${width}px`)
      setAlturaInput(`${height}px`)
    }
  }

  // const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault()
  //   props.uploadFn && props.uploadFn()
  // }

  // const uploadStyle: CSSProperties = {
  //   width: labelRef.current?.width,
  //   height: labelRef.current?.height
  // }

  return (
    <Styles.Container>
      <Styles.UploadLabel ref={updateInput} htmlFor="file">
        <Styles.Message>Drag & Drop to Upload</Styles.Message>
        <Button styleType="primary">Choose a File</Button>
      </Styles.UploadLabel>
      <Styles.UploadHide
        style={{ width: widthInput, height: heightInput }}
        type="file"
        id="file"
      />
    </Styles.Container>
  )
}

export default UploadInput
