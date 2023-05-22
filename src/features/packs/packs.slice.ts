import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { ArgCreatePackType, FetchPacksResponseType, PackType } from "./packs.types";
import {packsApi} from "features/packs/packs.api"

const fetchPacks = createAppAsyncThunk<{ packsPage: FetchPacksResponseType }, void>(
  "packs/fetchPacks",
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks();
      return { packsPage: res.data };
    });
  }
);

const createPack = createAppAsyncThunk<void, ArgCreatePackType>(
  "packs/createPack",
  async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.createPack(arg);
    dispatch(fetchPacks());
  });
});

const removePack = createAppAsyncThunk<void, string>(
  "packs/removePack",
  async (id, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.removePack(id);
    dispatch(fetchPacks());
  });
});

const updatePack = createAppAsyncThunk<void, PackType>(
  "packs/updatePack",
  async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.updatePack(arg);
    dispatch(fetchPacks());
  });
});

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 2000,
    minCardsCount: 0,
    maxCardsCount: 100,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
      const packsPage = action.payload.packsPage;
      state.cardPacks = packsPage.cardPacks;
      state.page = packsPage.page;
      state.pageCount = packsPage.pageCount;
      state.cardPacksTotalCount = packsPage.cardPacksTotalCount;
      state.minCardsCount = packsPage.minCardsCount;
      state.maxCardsCount = packsPage.maxCardsCount;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsThunks = { fetchPacks, createPack, removePack, updatePack  };
