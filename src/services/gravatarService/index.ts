import { MD5 } from 'crypto-js'

export const getAvatar = (email: string) => {
  const emailHash = MD5(`${email}`.toLowerCase()).toString()
  const url = `https://www.gravatar.com/avatar/${emailHash}`

  return url
}
