export type PackType = {
  _id: string
  user_id: string
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
  isOwner: boolean
}

export type ArgCreatePackType = {
  name?: string
  deckCover?: string
  private?: boolean
}

export type UpdatePackResponseType = {
  updatedCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type GetPacksParamsType = {
  packName?: string
  min?: number
  max?: number
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
  isOwner?: boolean
  sortPacks?: '0updated' | '1updated'
}

export type FetchPacksResponseType = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type CreatePackResponseType = {
  newCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type RemovePackResponseType = {
  deletedCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type EditPackValuesType = {
  _id: string
  name: string
  privateCard: boolean
}