export interface NewUser {
  username: string
  email: string
  password: string
}

export interface NewUserRequest {
  user: NewUser
}
