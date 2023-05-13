// auth
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
}
export type UpdateProfileDataType = {
  name: string
}

// packs
export type PackType = {
  _id: number
  user_id: number
  user_name: string
  name: string
  cardsCount: number
  created: string
  updated: string
  grade: number
  more_id: string
  path: string
  private: boolean
  rating: number
  shorts: number
  type: string
  __v: number
}
export type ArgGetPacksType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
// если вас кто то забанил. То с помощью
// данного параметра можно увидеть свои колоды
// и поправить их или удалить или обжаловать
}
export type ResGetPacksType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number// выбранная страница
  pageCount: number
}
export type ArgCreatePackType = {
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}

export type ArgDeletePackType = { id: number }

export type ArgUpdatePackType = {
  cardsPack: {
    _id: number
    name?: string
    deckCover?: string
    private?: boolean
  }
}
