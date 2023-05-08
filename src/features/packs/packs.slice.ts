import {createSlice} from "@reduxjs/toolkit"
import {ArgCreatePackType, ArgGetPacksType, PackType, ResGetPacksType} from "common/types/types"
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk"
import {thunkTryCatch} from "common/utils/thunk-try-catch"
import {packsApi} from "features/packs/packs.api"


const getPacks = createAppAsyncThunk<ResGetPacksType, ArgGetPacksType>
("packs/get-packs", async (arg: ArgGetPacksType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPacks(arg)
    return res.data
  }, false)
})
const createPack = createAppAsyncThunk<{newPack: PackType} & ResGetPacksType, ArgCreatePackType>
("packs/create-pack", async (arg: ArgCreatePackType, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const {dispatch} = thunkApi
    const res = await packsApi.createPack(arg)
    dispatch(packsThunks.getPacks({}))
    return res.data
  }, false)
})


const slice = createSlice({
  name: "packs",
  initialState: {
    packs: [] as PackType[] | null,
    params: {
      page: '1',
      pageCount: '4',
      min: '0',
      max: '100',
      user_id: '',
      packName: ''
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPacks.fulfilled, (state, action) => {
        state.packs = action.payload.cardPacks
      })
      .addCase(createPack.fulfilled, (state, action) => {
        state.packs?.unshift(action.payload.newPack)
      })
  }
})

export const packsThunks = {
  getPacks, createPack
}
export const packsReducer = slice.reducer