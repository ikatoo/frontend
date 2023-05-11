import { useEffect, useState } from 'react'

import Styles from './styles'
import Button from 'src/components/Button'
import { FormContainer } from 'src/components/FormContainer'
import TagEditor, { Tag } from 'src/components/TagEditor'
import TextArea from 'src/components/TextArea'
import { TextContainer } from 'src/components/TextContainer'
import TextInput from 'src/components/TextInput'
import { useAlert } from 'src/hooks/useAlert'
import skillsService from 'src/services/skillsService'
import { Job, SkillsPageProps } from 'src/types/SkillsPage'

export const AdminSkills = () => {
  const { setAlert } = useAlert()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [skills, setSkills] = useState<Tag[]>([])
  const [lastJobs, setLastJobs] = useState<Job[] | []>([])
  const [initialData, setInitialData] = useState<SkillsPageProps>()

  useEffect(() => {
    const getInitialData = async () => {
      const result = await skillsService.get()
      if (result) {
        setInitialData(result.data)
      }
    }
    getInitialData()
  }, [])

  useEffect(() => {
    setTitle(`${initialData?.title}`)
    setDescription(`${initialData?.description}`)
    setSkills(
      initialData?.skills.map((skill) => ({ title: skill.skillTitle })) ?? []
    )
    setLastJobs(initialData?.lastJobs ?? [])
  }, [initialData])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!initialData) {
      skillsService.create({
        title,
        description,
        skills: skills.map((skill) => ({
          skillTitle: skill.title,
          rankPercent: 0
        })),
        lastJobs
      })
      setAlert({
        title: 'Success on create skills page.',
        type: 'message'
      })
    } else {
      skillsService.patch({
        title: title,
        description: description,
        skills: skills.map((skill) => ({
          skillTitle: skill.title,
          rankPercent: 0
        })),
        lastJobs
      })
      setAlert({ title: 'Success on update skills page.', type: 'message' })
    }
  }

  const onChangeTags = (values: Tag[]) => {
    setSkills(values)
  }

  return (
    <Styles.Wrapper>
      <TextContainer title={'Informações sobre você.'}>
        <FormContainer>
          <Styles.Form
            onSubmit={handleSubmit}
            method="post"
            name="skillsPageForm"
          >
            <Styles.TextWrapper>
              <TextInput
                initialValue={title}
                labelColor="white"
                label="Título"
                name="title"
                placeholder="Título"
                onInputChange={(value) => setTitle(value)}
                autoFocus
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

            <Styles.TextWrapper>
              {/* <Styles.FieldSet>
                <legend role="label">Imagem</legend>
                <TextInput
                  name="illustrationURL"
                  placeholder="https://domain.com/image.jpg"
                  label="Imagem URL"
                  labelColor="white"
                  initialValue={illustrationURL}
                  onInputChange={(value) => setIllustrationURL(value)}
                />
                <TextInput
                  name="illustrationALT"
                  placeholder="Uma breve descrição da imagem"
                  label="Imagem ALT"
                  labelColor="white"
                  initialValue={illustrationALT}
                  onInputChange={(value) => setIllustrationALT(value)}
                />
              </Styles.FieldSet> */}
            </Styles.TextWrapper>

            <Styles.Actions>
              {!initialData && <Button styleType="primary">Salvar</Button>}
              {!!initialData && <Button styleType="primary">Atualizar</Button>}
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
