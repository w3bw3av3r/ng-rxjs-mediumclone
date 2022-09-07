export interface NewUser {
  username: string
  email: string
  password: string
}

export interface NewUserRequest {
  user: NewUser
}

export interface LoginUser {
  email: string
  password: string
}

export interface LoginUserRequest {
  user: LoginUser
}
