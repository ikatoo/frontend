export type Job = {
  jobTitle: string
  jobDescription: string
  yearMonthStart: string | undefined
  yearMonthEnd?: string | undefined
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
