export type ArgLoginType = {
  email: string
  password: string
  rememberMe: boolean
}
export type ArgRegisterType = Omit<ArgLoginType, 'rememberMe' | 'isLoggedIn'>

export type ArgForgotPasswordType = Omit<ArgRegisterType, 'password'>

export type NewPassReqType = {
  password: string
  resetPasswordToken: string
}
export type TokenResponseType = {
  token: string
}
export type RegisterResponseType = {
  addedUser: Omit<ProfileType, 'token' | 'tokenDeathTime'>
}
export type ProfileType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}
export type UpdateProfileDataType = {
  avatar?: string
  name?: string
}