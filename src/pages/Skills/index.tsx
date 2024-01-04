import { useEffect, useState } from 'react'
import { ProjectCard } from 'src/components/ProjectCard'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import projectsService, { CreateProject } from 'src/services/projectsService'
import CommonWrapper from 'src/styles/common/wrapper'
import { TextContainer } from '../../components/TextContainer'
import skillsService from '../../services/skillsService'
import Styles from './styles'

export const Skills = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projects, setProjects] = useState<CreateProject[]>([])

  useEffect(() => {
    setPageSubtitle('Skills Page')

    const getInitialData = async () => {
      const pageData = (await skillsService.get())?.data
      pageData?.title && setTitle(pageData.title)
      pageData?.description && setDescription(pageData.description)

      const { data: projects, status: projectsStatus } =
        await projectsService.getAll()
      console.log('data ===>', projects)
      if (projectsStatus === 200) {
        setProjects(projects)
      }
    }

    getInitialData()
  }, [])

  return (
    <CommonWrapper>
      <Styles.Text>
        {!!title && (
          <TextContainer title={title}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </TextContainer>
        )}
      </Styles.Text>
      <Styles.Projects>
        <Styles.Title>Atuação em projetos e habilidades técnicas</Styles.Title>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </Styles.Projects>
    </CommonWrapper>
  )
}
