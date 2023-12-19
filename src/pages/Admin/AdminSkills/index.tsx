import { useCallback, useEffect, useState } from 'react'

import Button from 'src/components/Button'
import { FormContainer } from 'src/components/FormContainer'
import TextArea from 'src/components/TextArea'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import { useAlert } from 'src/hooks/useAlert'
import skillsService from 'src/services/skillsService'
import { SkillsPageProps } from 'src/types/SkillsPage'
import Styles from './styles'

export const AdminSkills = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [initialData, setInitialData] = useState({} as SkillsPageProps)
  const [focus, setFocus] = useState(true)
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    const { id, title, description, projects } = initialData
    const isEmpty = !!(
      !id &&
      !title &&
      !description &&
      !!(!projects || !projects.length)
    )
    setIsEmpty(isEmpty)
  }, [initialData])

  const getInitialData = useCallback(async () => {
    const result = await skillsService.get()
    !!result?.data && setInitialData(result.data)
  }, [])

  useEffect(() => {
    setPageSubtitle('Edit Skills Page')

    getInitialData()
  }, [getInitialData])

  useEffect(() => {
    setTitle(initialData?.title ?? '')
    setDescription(initialData?.description ?? '')
  }, [initialData])

  const handleReset = () => {
    setTitle('')
    setDescription('')
    setFocus(true)
  }

  const save = async (event: React.FormEvent) => {
    event.preventDefault()

    skillsService.create({
      title,
      description
    })
    getInitialData()
    setAlert({
      title: 'Success on create skills page.',
      type: 'message'
    })
  }

  const update = async (event: React.FormEvent) => {
    event.preventDefault()

    skillsService.patch({
      title,
      description
    })
    getInitialData()
    setAlert({ title: 'Success on update skills page.', type: 'message' })
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Suas habilidades e experiências.'}>
        <FormContainer>
          <Styles.Form onReset={handleReset} name="skillsPageForm">
            <Styles.TextWrapper>
              <TextInput
                focus={focus}
                onBlur={() => {
                  setFocus(false)
                }}
                initialValue={title}
                labelColor="white"
                label="Título"
                name="title"
                placeholder="Título"
                onInputChange={setTitle}
                autoFocus={focus}
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TextArea
                name="description"
                initialValue={description}
                label="Descrição"
                placeholder="Descrição"
                labelColor="white"
                onTextAreaChange={setDescription}
              />
            </Styles.TextWrapper>

            <Styles.Actions>
              {isEmpty ? (
                <Button styleType="primary" onClick={save}>
                  Salvar
                </Button>
              ) : (
                <Button styleType="primary" onClick={update}>
                  Atualizar
                </Button>
              )}
              <Button styleType="secondary" type="reset">
                Limpar
              </Button>
            </Styles.Actions>
          </Styles.Form>
        </FormContainer>
      </TextContainer>
    </Styles.Wrapper>
  )
}
