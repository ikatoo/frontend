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
  // const onChange = (data: string) => {
  //   !!props.onChange && props.onChange(data)
  // }

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
      <Styles.EditorWrapper>{/* editor */}</Styles.EditorWrapper>
      {!!props.error && <Styles.Error>{props.error}</Styles.Error>}
    </Styles.Wrapper>
  )
}

export default TextEditor
