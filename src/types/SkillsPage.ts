export type SkillsPageProps = {
  title: string
  skills: {
    skillTitle: string
    rankPercent: number
  }[]
  lastJobs: {
    jobTitle: string
    jobDescription: string
    yearMonthStart: string
    link: string
  }[]
}
