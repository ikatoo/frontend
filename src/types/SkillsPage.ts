type Skill = {
  skillTitle: string
  rankPercent: number
}

type Jobs = {
  jobTitle: string
  jobDescription: string
  yearMonthStart: string
  yearMonthEnd?: string
}

export type SkillsPageServiceType = {
  title: string
  description: string
  skills: Skill[]
  lastJobs: Jobs[]
}
