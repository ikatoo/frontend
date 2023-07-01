import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Button from '../Button'
import Styles from './styles'

export type UploadInputProps = {
  name: string
  label?: string
  labelColor?: 'black' | 'white'
  disabled?: boolean
  onChangeFile?: (file: File) => void
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
  const [newLabel, setNewLabel] = useState(label)
  const [isValidEnv, setIsValidEnv] = useState(true)
  const [uploadEnabled, setUploadEnabled] = useState(false)

  useEffect(() => {
    const isLinux = /linux/i.test(`${navigator.userAgentData?.platform}`)
    const isEdge = /edge/i.test(`${navigator.userAgentData?.brands[2].brand}`)
    isLinux && isEdge && setIsValidEnv(false)
  }, [])

  useEffect(() => {
    !!error.length && setTimeout(() => setError(''), 5000)
  }, [error.length])

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const onInputChange = (item: File | null | undefined) => {
    setUploadEnabled(!!item?.size)
    if (!item) return setNewLabel('Click or Drop & Down a file here')
    if (!item?.type.startsWith('image/')) {
      return setError('Image only.')
    }
    setNewLabel(`${item.name} - ${(item.size / 1_000_000).toFixed(3)}MB`)

    props.onChangeFile && props.onChangeFile(item)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.items) {
      const file = event.dataTransfer.items[0].getAsFile()
      file?.size && onInputChange(file)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const inputElement = inputRef.current
    const item = inputElement?.files?.item(0)
    onInputChange(item)
  }

  const handleClickDropArea = () => {
    const inputElement = inputRef.current
    inputElement && inputElement.click()
  }

  const disableOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <Styles.Container onDrop={disableOnDrop}>
      <input
        hidden={isValidEnv}
        disabled={disabled}
        ref={inputRef}
        type="file"
        name={props.name}
        id={props.name}
        accept="image/*"
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onChange={handleInputChange}
      />
      <Styles.DropArea
        hidden={!isValidEnv}
        onClick={handleClickDropArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        disabled={disabled}
        labelColor={labelColor}
      >
        <Styles.Error>{error}</Styles.Error>
        {!error.length && <span>{newLabel}</span>}
      </Styles.DropArea>
      <Button
        disabled={!uploadEnabled}
        styleType="primary"
        onClick={props.uploadFn}
      >
        UPLOAD
      </Button>
    </Styles.Container>
  )
}

export default UploadInput
