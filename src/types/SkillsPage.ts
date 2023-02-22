export type Skill = {
  skillTitle: string
  rankPercent: number
}

export type LastJob = {
  jobTitle: string
  jobDescription: string
  yearMonthStart: string
  yearMonthEnd?: string
}

export type SkillsPageServiceType = {
  title: string
  description: string
  skills: Skill[]
  lastJobs: LastJob[]
}
