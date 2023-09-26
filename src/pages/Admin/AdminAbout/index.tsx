import { useEffect, useState } from 'react'

import Button from '../../../components/Button'
import { FormContainer } from '../../../components/FormContainer'
import TagEditor, { Tag } from '../../../components/TagEditor'
import TextArea from '../../../components/TextArea'
import { TextContainer } from '../../../components/TextContainer'
import TextInput from '../../../components/TextInput'
import { useAlert } from '../../../hooks/useAlert'
import aboutService from '../../../services/aboutService'
import { AboutPageServiceProps } from '../../../types/AboutPage'
import Styles from './styles'
import setPageSubtitle from 'src/helpers/setPageSubtitle'

export const AdminAbout = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [skills, setSkills] = useState<Tag[]>([])
  const [initialData, setInitialData] = useState<AboutPageServiceProps>()
  const [titleFocused, setTitleFocused] = useState(true)
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    setIsEmpty(!!(!initialData || !Object.keys(initialData).length))
  }, [initialData])

  useEffect(() => {
    setPageSubtitle('Edit About Page')

    const getInitialData = async () => {
      const result = await aboutService.get()
      setInitialData(result?.data)
    }
    getInitialData()
  }, [])

  useEffect(() => {
    initialData?.title && setTitle(initialData.title)
    initialData?.description && setDescription(initialData.description)
    initialData?.skills && setSkills(initialData.skills)
  }, [initialData])

  const save = async (event: React.FormEvent) => {
    event.preventDefault()

    aboutService.create({
      title,
      description,
      skills
    })
    setAlert({
      title: 'Success on create about page.',
      type: 'message'
    })
  }

  const update = async (event: React.FormEvent) => {
    event.preventDefault()

    aboutService.patch({
      title: title,
      description: description,
      skills
    })
    setAlert({ title: 'Success on update about page.', type: 'message' })
  }

  const onReset = () => {
    setTitle('')
    setDescription('')
    setSkills([])
    setTitleFocused(true)
  }

  const onChangeTags = (values: Tag[]) => {
    setSkills(values)
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Informações sobre você.'}>
        <FormContainer>
          <Styles.Form onReset={onReset} method="post" name="aboutPageForm">
            <Styles.TextWrapper>
              <TextInput
                initialValue={title}
                focus={titleFocused}
                onBlur={() => {
                  setTitleFocused(false)
                }}
                labelColor="white"
                label="Título"
                name="title"
                placeholder="Título"
                onInputChange={(value) => setTitle(value)}
                autoFocus={titleFocused}
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TextArea
                name="editor"
                initialValue={description}
                label="Descrição"
                placeholder="Descrição"
                labelColor="white"
                onTextAreaChange={(value) => setDescription(value)}
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TagEditor
                name="skills"
                title="Habilidades"
                initalValue={skills}
                onChangeTags={onChangeTags}
              />
            </Styles.TextWrapper>

            <Styles.Actions>
              {isEmpty && (
                <Button styleType="primary" onClick={save}>
                  Salvar
                </Button>
              )}
              {!isEmpty && (
                <Button styleType="primary" onClick={update}>
                  Atualizar
                </Button>
              )}
              <Button styleType="secondary" type="reset">
                Limpar Formulário
              </Button>
            </Styles.Actions>
          </Styles.Form>
        </FormContainer>
      </TextContainer>
    </Styles.Wrapper>
  )
}
