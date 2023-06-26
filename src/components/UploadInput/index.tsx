import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Button from '../Button'
import Styles from './styles'

export type UploadInputProps = {
  name: string
  label?: string
  labelColor?: 'black' | 'white'
  disabled?: boolean
  onUploadChange?: (file: File) => void
  uploadFn?: () => void
}

const UploadInput = ({
  labelColor = 'black',
  disabled = false,
  label = 'Click or Drop & Down a file here',
  ...props
}: UploadInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState('')

  useEffect(() => {
    !!error.length && Promise.resolve(setTimeout(() => setError(''), 5000))
  }, [error.length])

  const onInputChange = (item: File) => {
    if (!item) return
    if (!item?.type.startsWith('image/')) {
      return setError('Image only.')
    }
    props.onUploadChange && props.onUploadChange(item)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const { files } = event.dataTransfer
    const item = files.item(0)
    !!item && onInputChange(item)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDropAreaClick = () => {
    const inputElement = inputRef.current
    inputElement && inputElement.click()
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const inputElement = inputRef.current
    const item = inputElement?.files?.item(0)
    !!item && onInputChange(item)
  }

  return (
    <Styles.Container>
      <input
        hidden
        disabled={disabled}
        ref={inputRef}
        type="file"
        name={props.name}
        id={props.name}
        accept="image/*"
        onChange={handleInputChange}
      />
      <Styles.DropArea
        onClick={handleDropAreaClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        disabled={disabled}
        labelColor={labelColor}
      >
        <Styles.Error>{error}</Styles.Error>
        {!error.length && <span>{label}</span>}
      </Styles.DropArea>
      <Button disabled={disabled} styleType="primary" onClick={props.uploadFn}>
        UPLOAD
      </Button>
    </Styles.Container>
  )
}

export default UploadInput
