import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {
  ArgCreateCardType, ArgUpdateCardGardeType,
  ArgUpdateCardType,
  CardType,
  GetCardsParamsType,
  GetCardsResponseType,
  GetParamsType, UpdatedCardGradeType
} from "features/cards/cards.types"
import {createAppAsyncThunk, thunkTryCatch} from "common/utils"
import {cardsApi} from "features/cards/cards.api"
import {packsThunks} from "features/packs/packs.slice"


const getCards = createAppAsyncThunk<{ cardsPage: GetCardsResponseType }, { _id?: string }>(
  'cards/getCards',
  async (arg, thunkAPI) => {
  const { getState, dispatch } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const params = {
      ...getState().cards.params,
      cardsPack_id: arg._id
    }
    const res = await cardsApi.getCards(params)
    dispatch(cardsActions.setCardsPackName({ packName: res.data.packName }))
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

const updateCardGrade = createAppAsyncThunk<{ updatedGrade: UpdatedCardGradeType }, ArgUpdateCardGardeType>(
  "cards/updateCardGrade",
  async (arg, thunkAPI) => {
    const {dispatch} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await cardsApi.updateCardGrade(arg)
      dispatch(cardsThunks.getCards({_id: arg.cardsPack_id}))
      return { updatedGrade: res.data.updatedGrade }
    })
  })


const slice = createSlice({
  name: "cards",
  initialState: {
    packName: '',
    packPrivate: false,
    cards: [] as CardType[],
    cardsTotalCount: 0,
    isOwner: false,
    selectedCardId: '' as string,
    isLoading: false as boolean,
    packUserId: '',
    card: {} as CardType,
    params: {
      cardAnswer: '',
      cardQuestion: '',
      cardsPack_id: '',
      min: 0,
      max: 5,
      sortCards: 0,
      page: 1,
      pageCount: 4
    } as GetCardsParamsType
  },
  reducers: {
    setParams: (state, action: PayloadAction<{ params: GetCardsParamsType }>) => {
      state.params = { ...state.params, ...action.payload.params }
    },
    setCardsPackName: (state, action: PayloadAction<{ packName: string }>) => {
      state.packName = action.payload.packName
    }
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
      // .addCase(createCard.fulfilled, (state, action: PayloadAction<{ card: CardType }>) => {
      //   state.cards.unshift(action.payload.card)
      // })
      // .addCase(removeCard.fulfilled, (state, action) => {
      //   const index = state.cards.findIndex((c: CardType) => c._id && c._id === action.payload.deletedCard?._id)
      //   if (index !== -1) state.cards.splice(index, 1)
      // })
      // .addCase(updateCard.fulfilled, (state, action) => {
      //   const index = state.cards.findIndex((card: CardType) => card._id && card?._id === action.payload.updatedCard._id)
      //   if (index !== -1) state.cards[index] = action.payload.updatedCard
      // })
      // .addCase(packsThunks.updatePack.fulfilled, (state, action) => {
      //   state.packName = action.payload.pack.name
      // })
      // .addCase(updateCardGrade.fulfilled, (state, action) => {
      //   console.log('payload', action.payload)
      //   debugger
      //   const index = state.cards.findIndex((card: CardType) => card._id === action.payload.updatedGrade.updatedGrade.card_id)
      //   if (index !== -1) state.cards[index].grade = action.payload.updatedGrade.updatedGrade.grade
      // })
  }
})

export const cardsActions = {
  ...slice.actions,
  updatePackFulfilled: packsThunks.updatePack.fulfilled
}
export const cardsReducer = slice.reducer
export const cardsThunks = { getCards, createCard, removeCard, updateCard, updateCardGrade }
