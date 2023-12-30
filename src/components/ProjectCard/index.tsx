import { Delete, Edit } from '@styled-icons/material-outlined'
import Card from 'src/components/Card'
import { CreateProject } from 'src/services/projectsService'
import theme from 'src/theme'
import Styles from './Styles'
type ProjectCardProps = {
  project: CreateProject
  editProject?: (project: CreateProject) => void
  removeProject?: (id: number) => Promise<void>
}

export const ProjectCard = ({
  project,
  editProject,
  removeProject
}: ProjectCardProps) => {
  return (
    <Styles.CardWrapper>
      {editProject && removeProject && (
        <Styles.CardActionsWrapper>
          <Styles.CardActions>
            <Edit
              tabIndex={0}
              aria-label={`edit project with title ${project.title}`}
              onClick={() => {
                editProject(project)
              }}
            />
            <Delete
              tabIndex={0}
              aria-label={`remove project with title ${project.title}`}
              onClick={() => {
                project.id && removeProject(project.id)
              }}
              color={`${theme.colors.red}`}
            />
          </Styles.CardActions>
        </Styles.CardActionsWrapper>
      )}
      <Card
        title={project.title}
        subTitle={
          new Date(project.start).toLocaleDateString('pt-BR', {
            month: 'numeric',
            year: 'numeric'
          }) +
          ' - ' +
          new Date(project.lastUpdate).toLocaleDateString('pt-BR', {
            month: 'numeric',
            year: 'numeric'
          })
        }
        content={project.description}
        image={project.snapshot}
        link={project.repositoryLink}
        tags={project.skills}
      />
    </Styles.CardWrapper>
  )
}
