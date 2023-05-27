import { RootState } from "app/store"

export const selectPacks = (state: RootState) => state.packs.cardPacks
export const selectCardPacksTotalCount = (state: RootState) => state.packs.cardsPackTotalCount
export const selectPage = (state: RootState) => state.packs.params.page
export const selectPageCount = (state: RootState) => state.packs.params.pageCount
export const selectPackPaginationParams = (state: RootState) => state.packs.params
export const selectMinCardsCount = (state: RootState) => state.packs.params.min
export const selectMaxCardsCount = (state: RootState) => state.packs.params.max
