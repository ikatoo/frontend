import { CKEditor } from '@ckeditor/ckeditor5-react'
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig'

import Styles from './styles'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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
  const config: EditorConfig = {
    extraPlugins: [],
    placeholder: props?.placeholder
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
      <Styles.EditorWrapper>
        <CKEditor
          id={`ck_${props.name}`}
          editor={ClassicEditor}
          data={props.initialValue}
          config={config}
          onReady={(e) =>
            e.ui
              .getEditableElement()
              ?.setAttribute('tabindex', `${props.tabIndex}`)
          }
          onChange={(_event, editor) => {
            !!props.onChange && props.onChange(editor.getData())
          }}
        />
      </Styles.EditorWrapper>
      {!!props.error && <Styles.Error>{props.error}</Styles.Error>}
    </Styles.Wrapper>
  )
}

export default TextEditor
