import { useEffect, useState } from 'react'

import Button from '../../../components/Button'
import TextEditor from '../../../components/TextEditor'
import { FormContainer } from '../../../components/FormContainer'
import { TextContainer } from '../../../components/TextContainer'
import TextInput from '../../../components/TextInput'
import { useAlert } from '../../../hooks/useAlert'
import aboutService from '../../../services/aboutService'
import Styles from './styles'
import TagInput from '../../../components/TagInput'

export const AdminAbout = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [illustrationURL, setIllustrationURL] = useState('')
  const [illustrationALT, setIllustrationALT] = useState('')

  useEffect(() => {
    const getInitialData = async () => {
      const initialData = await aboutService.get()
      if (initialData) {
        setTitle(initialData.title)
        setDescription(initialData.description)
        setSkills(initialData.skills.map((skill) => skill.title))
        setIllustrationURL(initialData.illustrationURL)
        setIllustrationALT(initialData.illustrationALT)
      }
    }
    getInitialData()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!title.length) {
      aboutService.create({
        title,
        description,
        skills: skills.map((skill) => ({ title: skill })),
        illustrationURL,
        illustrationALT
      })
      setAlert({
        title: 'Success on create about page.',
        type: 'message'
      })
    } else {
      aboutService.update({
        title,
        description,
        skills: skills.map((skill) => ({ title: skill })),
        illustrationURL,
        illustrationALT
      })
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
                onBlur={(event) => setTitle(event.currentTarget.value)}
                tabIndex={1}
                autoFocus
              />
            </Styles.TextWrapper>

            <Styles.TextWrapper>
              <TextEditor
                initialValue={description}
                label="Descrição"
                labelColor="white"
                name="description"
                placeholder="Descrição"
                onChange={(value) => setDescription(value)}
                tabIndex={2}
              />
            </Styles.TextWrapper>

            <TagInput
              initialValue={skills}
              label="Skills"
              labelColor="white"
              name="skills"
              placeholder="Skills"
              onBlur={(value) =>
                setSkills([...skills, value.currentTarget.value])
              }
              tabIndex={3}
            />

            <TextInput
              initialValue={illustrationURL}
              labelColor="white"
              label="Illustration URL"
              name="illustrationURL"
              placeholder="http://urltoyourillustration"
              onBlur={(event) => setIllustrationURL(event.currentTarget.value)}
              tabIndex={4}
              autoFocus
            />

            <TextInput
              initialValue={illustrationALT}
              labelColor="white"
              label="Illustration ALT"
              name="illustrationALT"
              placeholder="Brief description of the illustration."
              onBlur={(event) => setIllustrationALT(event.currentTarget.value)}
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
