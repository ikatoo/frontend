import { useEffect, useState } from 'react'

import Button from 'src/components/Button'
import Form, { Actions } from 'src/components/Form'
import { FormContainer } from 'src/components/FormContainer'
import TextArea from 'src/components/TextArea'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import TextWrapper from 'src/components/TextWrapper'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import { useAlert } from 'src/hooks/useAlert'
import skillsService from 'src/services/skillsService'
import { SkillsPageProps } from 'src/types/SkillsPage'
import Styles from './styles'

export const AdminSkills = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [initialData, setInitialData] = useState({} as SkillsPageProps)
  const [focus, setFocus] = useState(true)
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    const { id, title, description } = initialData
    const isEmpty = !!(!id && !title && !description)
    setIsEmpty(isEmpty)

    setTitle(initialData?.title ?? '')
    setDescription(initialData?.description ?? '')
  }, [initialData])

  useEffect(() => {
    setPageSubtitle('Edit Skills Page')
    const getInitialData = async () => {
      const result = await skillsService.get()
      !!result?.data && setInitialData(result.data)
    }
    getInitialData()
  }, [])

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
    setAlert({ title: 'Success on update skills page.', type: 'message' })
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Suas habilidades e experiências.'}>
        <FormContainer>
          <Form onReset={handleReset} name="skillsPageForm">
            <TextWrapper>
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
            </TextWrapper>

            <TextWrapper>
              <TextArea
                name="description"
                initialValue={description}
                label="Descrição"
                placeholder="Descrição"
                labelColor="white"
                onTextAreaChange={setDescription}
              />
            </TextWrapper>

            <Actions>
              {isEmpty ? (
                <Button id="save" styleType="primary" onClick={save}>
                  Salvar
                </Button>
              ) : (
                <Button id="update" styleType="primary" onClick={update}>
                  Atualizar
                </Button>
              )}
              <Button styleType="secondary" type="reset">
                Limpar
              </Button>
            </Actions>
          </Form>
        </FormContainer>
      </TextContainer>
    </Styles.Wrapper>
  )
}
