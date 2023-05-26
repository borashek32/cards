import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {
  ArgCreateCardType,
  ArgGetCardsType,
  CardType,
  GetCardsParamsType,
  GetCardsResponseType
} from "features/cards/cards.types"
import {createAppAsyncThunk, thunkTryCatch} from "common/utils"
import {cardsApi} from "features/cards/cards.api"


const getCards = createAppAsyncThunk<GetCardsResponseType, ArgGetCardsType>(
  'cards/getCards',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const params = {
        cardsPack_id: arg.cardsPack_id,
      }
      const res = await cardsApi.getCards(params)
      return { cards: res.data.cards, cardsPack_id: params.cardsPack_id, packName: res.data.packName }
    })
  })

const createCard = createAppAsyncThunk<{ card: CardType }, ArgCreateCardType>(
  'cards/createCard',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await cardsApi.createCard(arg)
      return { pack: res.data.newCard }
    }, false)
  })

const removeCard = createAppAsyncThunk<{ deletedCard: CardType }, string>(
  "cards/removeCard",
  async (id, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await cardsApi.removeCard(id)
      return {cardId: res.data.deletedCard}
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
    selectedCardsPackId: '' as string,
    isLoading: false as boolean,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload.cards
        state.packName = action.payload.packName
        state.selectedCardsPackId = action.payload.cardsPack_id
      })
      .addCase(createCard.fulfilled, (state, action: PayloadAction<{ card: CardType }>) => {
        state.cards.unshift(action.payload.card);
      })
      .addCase(removeCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex((c) => c._id === action.payload.deletedCard._id)
        if (index !== -1) state.cards.splice(index, 1)
      })
  }
})

export const cardsReducer = slice.reducer
export const cardsThunks = { getCards, createCard, removeCard }
