import axios from 'axios'
import env from 'src/helpers/env'

const getGithubDates = async (owner: string, repo: string) => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${env.VITE_GITHUB_TOKEN}`
      }
    }
  )

  const { created_at: createdAt, pushed_at: pushedAt } = response.data

  return { createdAt, pushedAt }
}

export default { getGithubDates }
