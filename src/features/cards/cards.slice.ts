import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {
  ArgCreateCardType,
  ArgUpdateCardType,
  CardType,
  GetCardsParamsType,
  GetCardsResponseType,
  GetParamsType
} from "features/cards/cards.types"
import {createAppAsyncThunk, thunkTryCatch} from "common/utils"
import {cardsApi} from "features/cards/cards.api"


const getCards = createAppAsyncThunk<{ cardsPage: GetCardsResponseType }, { _id?: string }>(
  'cards/getCards',
  async (arg, thunkAPI) => {
  const { getState } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const params = {
      ...getState().cards.params,
      cardsPack_id: arg._id
    }
    const res = await cardsApi.getCards(params)
    return { cardsPage: res.data }
  }, false)
})

const createCard = createAppAsyncThunk<{ card: CardType }, ArgCreateCardType>(
  'cards/createCard',
  async (arg, thunkAPI) => {
  const {dispatch} = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.createCard(arg)
    dispatch(cardsThunks.getCards({_id: arg.cardsPack_id}))
    return { card: res.data.newCard }
  })
})

const removeCard = createAppAsyncThunk<{ deletedCard: CardType }, { id: string, cardsPack_id: string }>(
  "cards/removeCard",
  async (arg, thunkAPI) => {
  const {dispatch} = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.removeCard(arg.id)
    dispatch(cardsThunks.getCards({_id: arg.cardsPack_id}))
    return {deletedCard: res.data.deletedCard}
  })
})

const updateCard = createAppAsyncThunk<{ updatedCard: CardType }, ArgUpdateCardType>(
  "cards/updateCard",
  async (arg, thunkAPI) => {
  const {dispatch} = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.updateCard(arg)
    dispatch(cardsThunks.getCards({_id: arg.cardsPack_id}))
    return { updatedCard: res.data.updatedCard }
  })
})


const slice = createSlice({
  name: "cards",
  initialState: {
    packName: '',
    packPrivate: false,
    cards: [] as CardType[],
    cardsTotalCount: 0,
    params: {
      cardAnswer: '',
      cardQuestion: '',
      cardsPack_id: '',
      min: 0,
      max: 5,
      sortCards: 0,
      page: 1,
      pageCount: 4
    } as GetCardsParamsType,
    selectedCardId: '' as string,
    isLoading: false as boolean,
    packUserId: ''
  },
  reducers: {
    setParams: (state, action: PayloadAction<{ params: GetParamsType }>) => {
      state.params = { ...state.params, ...action.payload.params }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        const actionPayload = action.payload.cardsPage
        state.cards = actionPayload.cards
        state.packUserId = actionPayload.packUserId
        state.packName = actionPayload.packName
        state.packPrivate = actionPayload.packPrivate
        state.cardsTotalCount = actionPayload.cardsTotalCount
      })
      .addCase(createCard.fulfilled, (state, action: PayloadAction<{ card: CardType }>) => {
        state.cards.unshift(action.payload.card)
      })
      .addCase(removeCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex((c: CardType) => c._id && c._id === action.payload.deletedCard?._id)
        if (index !== -1) state.cards.splice(index, 1)
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex((card: CardType) => card._id && card?._id === action.payload.updatedCard._id)
        if (index !== -1) state.cards[index] = action.payload.updatedCard
      })
  }
})

export const cardsActions = slice.actions
export const cardsReducer = slice.reducer
export const cardsThunks = { getCards, createCard, removeCard, updateCard }
