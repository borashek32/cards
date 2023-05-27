import { RootState } from "app/store"

export const selectIsLoading = (state: RootState) => state.app.isLoading
export const selectIsAppInitialized = (state: RootState) => state.app.isAppInitialized