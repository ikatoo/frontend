import { useEffect, useState } from 'react'

import Button from '../../../components/Button'
import { FormContainer } from '../../../components/FormContainer'
import TagInput from '../../../components/TagInput'
import { TextContainer } from '../../../components/TextContainer'
import TextEditor from '../../../components/TextEditor'
import TextInput from '../../../components/TextInput'
import { useAlert } from '../../../hooks/useAlert'
import aboutService from '../../../services/aboutService'
import Styles from './styles'

export const AdminAbout = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [illustrationURL, setIllustrationURL] = useState('')
  const [illustrationALT, setIllustrationALT] = useState('')
  const [createOrUpdate, setCreateOrUpdate] = useState<'create' | 'update'>(
    'create'
  )

  useEffect(() => {
    const getInitialData = async () => {
      const initialData = await aboutService.get()
      if (Object.keys(initialData).length) {
        setTitle(initialData.title)
        setDescription(initialData.description)
        setSkills(initialData.skills.map((skill) => skill.title))
        setIllustrationURL(initialData.illustrationURL ?? '')
        setIllustrationALT(initialData.illustrationALT ?? '')
        setCreateOrUpdate('update')
      }
    }
    getInitialData()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const aboutPageData = {
      title,
      description,
      skills: skills.map((skill) => ({ title: skill })),
      illustrationURL,
      illustrationALT
    }

    if (createOrUpdate === 'create') {
      aboutService.create(aboutPageData)
      setAlert({
        title: 'Success on create about page.',
        type: 'message'
      })
    } else {
      aboutService.update(aboutPageData)
      setAlert({ title: 'Success on update about page.', type: 'message' })
    }
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Informações sobre você.'}>
        <FormContainer>
          <Styles.Form onSubmit={handleSubmit} method="post">
            <Styles.TextWrapper>
              <TextInput
                initialValue={title}
                labelColor="white"
                label="Título"
                name="title"
                placeholder="Título"
                onInputChange={setTitle}
                tabIndex={1}
                autoFocus
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TextEditor
                initialValue={description || ''}
                label="Descrição"
                labelColor="white"
                name="description"
                placeholder="Descrição"
                onChange={setDescription}
                tabIndex={2}
              />
            </Styles.TextWrapper>

            <TagInput
              initialTags={skills}
              onTagsChange={setSkills}
              label="Skills"
              labelColor="white"
              name="skills"
              placeholder="Skills"
              tabIndex={3}
              autoFocus
            />

            <TextInput
              initialValue={illustrationURL}
              labelColor="white"
              label="Illustration URL"
              name="illustrationURL"
              placeholder="http://urltoyourillustration"
              onInputChange={setIllustrationURL}
              tabIndex={4}
              autoFocus
            />

            <TextInput
              initialValue={illustrationALT}
              labelColor="white"
              label="Illustration ALT"
              name="illustrationALT"
              placeholder="Brief description of the illustration."
              onInputChange={setIllustrationALT}
              tabIndex={5}
              autoFocus
            />

            <Styles.Actions>
              <Button tabIndex={6} styleType="primary">
                Salvar
              </Button>
            </Styles.Actions>
          </Styles.Form>
        </FormContainer>
      </TextContainer>
    </Styles.Wrapper>
  )
}
