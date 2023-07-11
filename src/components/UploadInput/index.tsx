import {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState
} from 'react'
import Button from '../Button'
import Styles from './styles'

export type UploadInputProps = {
  name: string
  label?: string
  labelColor?: 'black' | 'white'
  disabled?: boolean
  showUploadButton?: boolean
  onChangeFile?: (file: File) => void
  uploadFn?: () => void
} & InputHTMLAttributes<HTMLInputElement>

const UploadInput = ({
  labelColor = 'black',
  disabled = false,
  label = 'Click or Drop & Down a file here',
  showUploadButton = false,
  tabIndex = 0,
  onChangeFile,
  uploadFn,
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

  const onInputChange = (file: File | null | undefined) => {
    if (!file || !file.size) {
      setUploadEnabled(false)
      setNewLabel('Click or Drop & Down a file here')
      return
    }
    if (!file?.type.startsWith('image/')) {
      setUploadEnabled(false)
      return setError('Image only.')
    }
    setUploadEnabled(true)
    setNewLabel(`${file.name} - ${(file.size / 1_000_000).toFixed(3)}MB`)

    onChangeFile && onChangeFile(file)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.items) {
      const file = event.dataTransfer.items[0].getAsFile()
      onInputChange(file)
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
        {...props}
        tabIndex={tabIndex}
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
        tabIndex={0}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key.toLowerCase() === 'enter' || e.key.toLowerCase() === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onClick={handleClickDropArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        disabled={disabled}
        labelColor={labelColor}
      >
        <Styles.Error>{error}</Styles.Error>
        {!error.length && <span>{newLabel}</span>}
      </Styles.DropArea>
      {!!showUploadButton && (
        <Button
          disabled={!uploadEnabled}
          styleType="primary"
          onClick={uploadFn}
        >
          UPLOAD
        </Button>
      )}
    </Styles.Container>
  )
}

export default UploadInput
