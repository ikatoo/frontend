export type Job = {
  jobTitle: string
  jobDescription: string
  yearMonthStart: string
  yearMonthEnd?: string
  link: string
}

export type SkillsPageProps = {
  title: string
  description: string
  skills: {
    skillTitle: string
  }[]
  lastJobs: Job[]
}
