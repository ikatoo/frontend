export type User = {
  id: string
  username: string
  name: string
  email: string
  password?: string
  avatar: {
    url: string
    alt: string
  }
}

export type UserSignUp = {
  name: string
  email: string
  password: string
}
