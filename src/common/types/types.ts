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
    name?: string // если не отправить будет таким
    deckCover?: string // не обязателен
    private?: boolean
  }
}

export type ArgDeletePackType = Omit<ArgCreatePackType, 'name' | 'deckCover' | 'private'>

export type ArgUpdatePackType = {
  _id: string
  name?: string // если не отправить будет таким
  deckCover?: string // не обязателен
  private?: false // если не отправить будет такой
}
