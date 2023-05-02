import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";


const appInitialState = {
  error: null as string | null,
  isLoading: true,
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
      const a = current(state);
      console.log(a);
      // Логику в подредьюсерах пишем мутабельным образом,
      // т.к. иммутабельность достигается благодаря immer.js
      state.isLoading = action.payload.isLoading;
    },
    setAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
      state.isAppInitialized = action.payload.isAppInitialized
    }
  },
});

export const appReducer = slice.reducer;
// Action creators создаются автоматически для каждого подредьюсера
// Все экшены упаковываем в объект. В дальнейшем пригодится
export const appActions = slice.actions;
