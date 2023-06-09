export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: CardGradeType
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}

export type GetCardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: '0grade' | '1grade'
  page?: number
  pageCount?: number
  packName?: string
  user_id?: string
  cardsTotalCount?: number
}

export type GetParamsType = Omit<GetCardsParamsType, 'cardsPack_id'>

export type FetchCardsResponseType = {
  cards: CardType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: CardGradeType
  maxGrade: CardGradeType
  token: string
  tokenDeathTime: number
  isOwner: boolean
}

export type CardGradeType = 0 | 1 | 2 | 3 | 4 | 5

export type ArgCreateCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number | null
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type ArgUpdateCardType = {
  _id: string
  question?: string
  answer?: string
  grade?: number | null
  shots?: number
  answerImg?: string
  questionImg?: string
  cardsPack_id: string
}

export type GetCardsResponseType = {
  cards: CardType[]
  cardsPack_id: string
  packName: string
  packPrivate: boolean
  page?: number
  pageCount?: number
  packUserId: string
  cardsTotalCount: number
}

export type DeleteCardResponseType = {
  deletedCard: CardType
  token: string
  tokenDeathTime: number
}

export type ArgUpdateCardGardeType = {
  card_id: string
  grade: CardGradeType
  cardsPack_id: string
}

export type UpdatedCardGradeType = {
  token: string
  tokenDeathTime: number
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: CardGradeType
    shots: number
  }
}