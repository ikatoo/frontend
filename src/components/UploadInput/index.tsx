import { useState } from 'react'
import Button from '../Button'
import TextInput, { TextInputProps } from '../TextInput'
import Styles from './styles'

export type UploadInputProps = Pick<
  TextInputProps,
  'name' | 'placeholder' | 'label' | 'labelColor'
> & {
  uploadFn?: () => void
}

const UploadInput = (props: UploadInputProps) => {
  const [value, setValue] = useState('')

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.uploadFn && props.uploadFn()
  }

  return (
    <>
      <Styles.Hidden>
        <TextInput
          type="file"
          accept="image/*"
          initialValue={value}
          onInputChange={setValue}
          name={props.name}
          placeholder={props.placeholder}
          label={props.label}
          labelColor={props.labelColor}
        />
      </Styles.Hidden>
      <Styles.FileArea htmlFor={props.name}>
        <Styles.DropZone
          onDrop={(event) => {
            console.log(event)
            event.preventDefault()
          }}
        >
          {!value.length
            ? 'Solte o arquivo aqui ou click para escolher'
            : value}
        </Styles.DropZone>
      </Styles.FileArea>
      <Styles.InlineButton>
        <Button
          styleType="secondary"
          type="button"
          onClick={onClick}
          disabled={!value.length}
        >
          UPLOAD
        </Button>
      </Styles.InlineButton>
    </>
  )
}

export default UploadInput
