import TextArea from '../TextArea'
import Styles from './styles'

export type EditorProps = {
  onEditorChange?: (value: string) => void
  name: string
  label?: string
  labelColor?: 'black' | 'white'
  initialValue?: string
  disabled?: boolean
  error?: string
  tabIndex?: number
}

const TextEditor = (props: EditorProps) => {
  const onChange = (value: string | undefined) => {
    !!props.onEditorChange && props.onEditorChange(value ?? '')
  }

  return (
    <Styles.Wrapper disabled={props.disabled} error={!!props.error}>
      <Styles.EditorWrapper>
        <TextArea
          label={props.label}
          labelColor={props.labelColor}
          name={props.name}
          tabIndex={1}
          onTextAreaChange={onChange}
        />
      </Styles.EditorWrapper>
      {!!props.error && <Styles.Error>{props.error}</Styles.Error>}
    </Styles.Wrapper>
  )
}

export default TextEditor
