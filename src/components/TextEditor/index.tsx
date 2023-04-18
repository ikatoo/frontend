import { Editor } from '@monaco-editor/react'
import { useRef } from 'react'
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
  const editorRef = useRef<unknown>()

  const onChange = (value: string | undefined) => {
    !!props.onChange && props.onChange(value ?? '')
  }

  const handleLabelClick = () => {
    editorRef.current && (editorRef.current as { focus: () => void }).focus()
  }

  return (
    <Styles.Wrapper disabled={props.disabled} error={!!props.error}>
      {!!props.label && (
        <Styles.Label labelColor={props.labelColor} onClick={handleLabelClick}>
          {props.label}
        </Styles.Label>
      )}
      <Styles.EditorWrapper>
        <Editor
          height="200px"
          defaultLanguage="html"
          defaultValue={props.initialValue}
          onChange={onChange}
          onMount={(editor) => {
            editorRef.current = editor
          }}
          options={{
            tabIndex: props.tabIndex,
            autoIndent: 'full',
            formatOnPaste: true
          }}
        />
      </Styles.EditorWrapper>
      {!!props.error && <Styles.Error>{props.error}</Styles.Error>}
    </Styles.Wrapper>
  )
}

export default TextEditor
