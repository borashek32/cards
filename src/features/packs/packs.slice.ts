import {createSlice} from "@reduxjs/toolkit"
import {
  ArgCreatePackType,
  ArgDeletePackType,
  ArgGetPacksType,
  ArgUpdatePackType,
  PackType,
  ResGetPacksType
} from "common/types/types"
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk"
import {thunkTryCatch} from "common/utils/thunk-try-catch"
import {packsApi} from "features/packs/packs.api"


const getPacks = createAppAsyncThunk<ResGetPacksType, ArgGetPacksType>
("packs/get-packs", async (arg: ArgGetPacksType, thunkApi) => {
  const {rejectWithValue} = thunkApi
  try {
    const res = await packsApi.getPacks(arg)
    return res.data
  } catch(e) {
    return rejectWithValue(e)
  }
})
const createPack = createAppAsyncThunk<{newPack: PackType} & any, ArgCreatePackType>
("packs/create-pack", async (arg: ArgCreatePackType, thunkApi) => {
  const {dispatch, rejectWithValue} = thunkApi
  try {
    const res = await packsApi.createPack(arg)
    return { pack: res.data }
  } catch(e) {
    return rejectWithValue(e)
  } finally {
    dispatch(packsThunks.getPacks({}))
  }
})
const deletePack = createAppAsyncThunk<{ pack: PackType } & any, ArgDeletePackType>
('packs/remove-pack', async (arg, thunkApi) => {
  const {dispatch, rejectWithValue} = thunkApi
  try {
    const res = await packsApi.deletePack(arg)
    return { pack: res.data }
  } catch(e) {
    rejectWithValue(e)
  } finally {
    dispatch(packsThunks.getPacks({}))
  }
})
const updatePack = createAppAsyncThunk<{ pack: PackType } & any, ArgUpdatePackType>
('packs/update-pack', async (arg, thunkApi) => {
  const {dispatch, rejectWithValue} = thunkApi
  try {
    debugger
    await packsApi.updatePack(arg)
  } catch(e) {
    rejectWithValue(e)
  } finally {
    dispatch(packsThunks.getPacks( {}))
  }
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
      .addCase(deletePack.fulfilled, (state, action) => {
        debugger
        const index = state.packs?.findIndex(p => p._id === action.payload.pack._id)
        if (index !== -1) state.packs?.slice(index, 1)
      })
      .addCase(updatePack.fulfilled, (state,action) => {
        debugger
        if (state.packs) {
          const index = state.packs.findIndex(p => p._id === action.payload.pack._id)
          if (index !== -1) {
            state.packs[index].name = "New Pack Name just updated"
          }
        }
      })
  }
})

export const packsThunks = {
  getPacks, createPack, deletePack, updatePack
}
export const packsReducer = slice.reducer