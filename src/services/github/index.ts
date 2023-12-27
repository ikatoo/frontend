import axios from 'axios'

export const getStartDate = async (owner: string, repo: string) => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`
  )

  console.log('response.data ===>', response.data)
}
