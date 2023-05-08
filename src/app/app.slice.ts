import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {AxiosError, isAxiosError} from "axios"


const appInitialState = {
  error: null as string | null,
  isLoading: false,
  isAppInitialized: false,
}
type InitialStateType = typeof appInitialState

const slice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    // Подредьюсер.
    // Action - это payload объект. Типизация через PayloadAction

    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      // чтобы дебажить и посмотреть текущий стейт
      // const a = current(state);
      // console.log(a);
      // Логику в подредьюсерах пишем мутабельным образом,
      // т.к. иммутабельность достигается благодаря immer.js
      state.isLoading = action.payload.isLoading
    },
    setAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
      state.isAppInitialized = action.payload.isAppInitialized
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith("/pending");
        },
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          if (!action.payload?.showGlobalError) return
          const err = action.payload as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else {
            state.error = `Native error ${err.message}`;
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      )
      // just for example
      // .addDefaultCase((state, action) => {
      //   console.log("addDefaultCase 🚀", action.type);
      // })
  }
})

export const appReducer = slice.reducer;
// Action creators создаются автоматически для каждого подредьюсера
// Все экшены упаковываем в объект. В дальнейшем пригодится
export const appActions = slice.actions;
