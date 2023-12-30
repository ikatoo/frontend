import { useEffect, useState } from 'react'
import { ProjectCard } from 'src/components/ProjectCard'
import { useUser } from 'src/contexts/User/UserContext'
import setPageSubtitle from 'src/helpers/setPageSubtitle'
import projectsService, { CreateProject } from '../../services/projectsService'
import Styles from './styles'

export const Projects = () => {
  const { user } = useUser()

  const [projects, setProjects] = useState<CreateProject[]>([])

  useEffect(() => {
    setPageSubtitle('Projects Page')

    const getInitialData = async () => {
      const initialData = (await projectsService.getByUserId(user?.id))?.data
      !!initialData && setProjects(initialData)
    }

    getInitialData()
  }, [user?.id])

  return (
    <Styles.Wrapper>
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </Styles.Wrapper>
  )
}
