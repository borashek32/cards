export type PackType = {
  _id: string
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
  name?: string;
  deckCover?: string;
  private?: boolean;
};

export type ArgDeletePackType = { id: number }


export type UpdatePackResponseType = {
  updatedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type ArgUpdatePackType = {
  cardsPack: {
    _id: number
    name?: string
    deckCover?: string
    private?: boolean
  }
}

export type FetchPacksResponseType = {
  cardPacks: PackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

export type CreatePackResponseType = {
  newCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type RemovePackResponseType = {
  deletedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

