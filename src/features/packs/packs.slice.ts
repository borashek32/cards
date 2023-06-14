import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk, thunkTryCatch} from "common/utils";
import {ArgCreatePackType, FetchPacksResponseType, GetPacksParamsType, PackType} from "./packs.types";
import {packsApi} from "features/packs/packs.api"


const fetchPacks = createAppAsyncThunk<{ packsPage: FetchPacksResponseType } >(
  "packs/fetchPacks",
  async (_, thunkAPI) => {
    const { getState } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const params = getState().packs.params
      const res = await packsApi.getPacks(params)
      return { packsPage: res.data }
    })
  }
)

const createPack = createAppAsyncThunk<{ pack: PackType }, ArgCreatePackType>(
  "packs/createPack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.createPack(arg)
      dispatch(packsThunks.fetchPacks())
      return { pack: res.data.newCardsPack }
    })
  })

const removePack = createAppAsyncThunk<{ packId: string }, { id: string, withUpdate: boolean }>(
  "packs/removePack",
  async ({id,withUpdate = true}, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.removePack(id)
      withUpdate && dispatch(packsThunks.fetchPacks())
      return {packId: res.data.deletedCardsPack._id}
    })
  })

const updatePack = createAppAsyncThunk<{ pack: PackType }, PackType>(
  "packs/updatePack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.updatePack(arg)
      dispatch(packsThunks.fetchPacks())
      return { pack: res.data.updatedCardsPack }
    })
  })

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: [] as PackType[],
    cardsPackTotalCount: 2000,
    selectedPack: {} as PackType,
    sortedPacks: [] as PackType[],
    params: {
      page: 1,
      pageCount: 4,
      sortPacks: '0updated',
      min: 0,
      max: 100,
      packName: '',
      user_id: '',
      filter: 'All'
    } as GetPacksParamsType
  },
  reducers: {
    setParams: (state, action: PayloadAction<{ params: GetPacksParamsType }>) => {
      state.params = {...state.params, ...action.payload.params}
    },
    setSelectedPack: (state, action: PayloadAction<{ _id?: string}>) => {
      const pack = state.cardPacks.find(p => p._id === action.payload?._id)
      if (pack) state.selectedPack = pack
    },
    setSortedPacks: (state, action: PayloadAction<{ packs: PackType[] }>) => {
      state.sortedPacks = action.payload.packs.sort((a, b) => (a.updated > b.updated ? 1 : -1))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPacks.fulfilled, (state, action) => {
        state.cardPacks = action.payload.packsPage.cardPacks
        state.cardsPackTotalCount = action.payload.packsPage.cardPacksTotalCount
      })
      // .addCase(createPack.fulfilled, (state, action) => {
      //   state.cardPacks.unshift(action.payload.pack)
      // })
      // .addCase(removePack.fulfilled, (state, action) => {
      //   const index = state.cardPacks.findIndex((pack: PackType) => pack._id === action.payload.packId)
      //   if (index !== -1) state.cardPacks.splice(index, 1)
      // })
      // .addCase(updatePack.fulfilled, (state, action) => {
      //   const index = state.cardPacks.findIndex((pack: PackType) => pack._id && pack._id === action.payload.pack?._id)
      //   if (index !== -1) state.cardPacks[index] = action.payload.pack
      // })
  }
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { fetchPacks, createPack, removePack, updatePack }
