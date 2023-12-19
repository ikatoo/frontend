type Skill = {
  id: number
  title: string
}

type Project = {
  id: number
  title: string
  description: string
  snapshot: string
  repositoryLink: string
  lastUpdate: Date
  userId: number
  skills: Skill[]
}

export type SkillsPageProps = {
  id: number
  title: string
  description: string
  projects: Project[]
}
