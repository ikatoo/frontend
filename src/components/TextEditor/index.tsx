import { Editor } from '@monaco-editor/react'
import Styles from './styles'

export type EditorProps = {
  onChange?: (value: string) => void
  label?: string
  labelColor?: 'black' | 'white'
  initialValue?: string
  disabled?: boolean
  error?: string
  tabIndex?: number
}

const TextEditor = (props: EditorProps) => {
  const onChange = (value: string | undefined) => {
    !!props.onChange && props.onChange(value ?? '')
  }

  return (
    <Styles.Wrapper disabled={props.disabled} error={!!props.error}>
      {!!props.label && (
        <Styles.Label labelColor={props.labelColor}>{props.label}</Styles.Label>
      )}
      <Styles.EditorWrapper>
        <Editor
          height="200px"
          defaultLanguage="html"
          defaultValue={props.initialValue}
          onChange={onChange}
          onMount={(editor, monaco) => {
            console.log('editor', editor)
            console.log('monaco', monaco)
          }}
        />
      </Styles.EditorWrapper>
      {!!props.error && <Styles.Error>{props.error}</Styles.Error>}
    </Styles.Wrapper>
  )
}

export default TextEditor
