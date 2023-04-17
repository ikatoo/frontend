import { Editor } from '@monaco-editor/react'
import Styles from './styles'

export type EditorProps = {
  placeholder: string
  onChange?: (value: string) => void
  label?: string
  labelColor?: 'black' | 'white'
  initialValue?: string
  disabled?: boolean
  error?: string
  name: string
  tabIndex?: number
}

const TextEditor = (props: EditorProps) => {
  const onChange = (value: string | undefined) => {
    !!props.onChange && props.onChange(value ?? '')
  }

  return (
    <Styles.Wrapper disabled={props.disabled} error={!!props.error}>
      {!!props.label && (
        <Styles.Label
          labelColor={props.labelColor}
          htmlFor={`ck_${props.name}`}
        >
          {props.label}
        </Styles.Label>
      )}
      {props.initialValue}
      <Styles.EditorWrapper>
        <Editor
          height="200px"
          defaultLanguage="html"
          defaultValue={props.initialValue}
          onChange={onChange}
        />
      </Styles.EditorWrapper>
      {!!props.error && <Styles.Error>{props.error}</Styles.Error>}
    </Styles.Wrapper>
  )
}

export default TextEditor
