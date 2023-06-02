import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {
  ArgCreateCardType, ArgUpdateCardType,
  CardType,
  GetCardsParamsType,
  GetCardsResponseType,
  GetParamsType
} from "features/cards/cards.types"
import {createAppAsyncThunk, thunkTryCatch} from "common/utils"
import {cardsApi} from "features/cards/cards.api"
import {packsApi} from "features/packs/packs.api"
import {packsThunks} from "features/packs/packs.slice"


const getCards = createAppAsyncThunk<GetCardsResponseType>(
  'cards/getCards',
  async (arg, thunkAPI) => {
    const {getState} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const params = {
        ...getState().cards.params,
        cardsPack_id: getState().cards.selectedCardsPackId
      }
      const res = await cardsApi.getCards(params)
      return {
        cards: res.data.cards,
        cardsPack_id: params.cardsPack_id,
        packName: res.data.packName,
        packUserId: res.data.packUserId
      }
    })
  })

const createCard = createAppAsyncThunk<{ card: CardType }, ArgCreateCardType>(
  'cards/createCard',
  async (arg, thunkAPI) => {
  const {dispatch} = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.createCard(arg)
    dispatch(cardsThunks.getCards())
    return { pack: res.data.newCard }
  })
})

const removeCard = createAppAsyncThunk<{ deletedCard: CardType }, string>(
  "cards/removeCard",
  async (id, thunkAPI) => {
  const {dispatch} = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.removeCard(id)
    dispatch(cardsThunks.getCards())
    return {cardId: res.data.deletedCard}
  })
})

const updateCard = createAppAsyncThunk<{ updatedCard: CardType }, ArgUpdateCardType>(
  "cards/updateCard",
  async (arg, thunkAPI) => {
  const {dispatch} = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.updateCard(arg)
    dispatch(cardsThunks.getCards())
    return { pack: res.data.updatedCard }
  })
})


const slice = createSlice({
  name: "cards",
  initialState: {
    packName: '',
    cards: [] as CardType[],
    params: {
      cardAnswer: '',
      cardQuestion: '',
      cardsPack_id: '',
      min: 0,
      max: 5,
      sortCards: 0,
      page: 1,
      pageCount: 4,
    } as GetCardsParamsType,
    selectedCardId: '' as string,
    selectedCardsPackId: '' as string,
    isLoading: false as boolean,
    packUserId: ''
  },
  reducers: {
    setParams: (state, action: PayloadAction<{ params: GetParamsType }>) => {
      state.params = { ...state.params, ...action.payload.params }
    },
    setCardsPackId: (state, action: PayloadAction<string>) => {
      state.selectedCardsPackId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload.cards
        state.packName = action.payload.packName
        state.selectedCardsPackId = action.payload.cardsPack_id
        state.packUserId = action.payload.packUserId
      })
      .addCase(createCard.fulfilled, (state, action: PayloadAction<{ card: CardType }>) => {
        state.cards.unshift(action.payload.card);
      })
      .addCase(removeCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex((c: CardType) => c._id && c._id === action.payload.deletedCard?._id)
        if (index !== -1) state.cards.splice(index, 1)
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex((card: CardType) => card._id && card?._id === action.payload.updatedCard._id)
        if (index !== -1) {
          state.cards[index] = action.payload.updatedCard
        }
      })
  }
})

export const cardsActions = slice.actions
export const cardsReducer = slice.reducer
export const cardsThunks = { getCards, createCard, removeCard, updateCard }
