import { RootState } from "app/store"

const selectPacks = (state: RootState) => state.packs.cardPacks
const selectCardPacksTotalCount = (state: RootState) => state.packs.cardsPackTotalCount
const selectPage = (state: RootState) => state.packs.params.page
const selectPageCount = (state: RootState) => state.packs.params.pageCount
const selectAuthorizedUserId = (state: RootState) => state.packs.params.user_id
const selectMinCardsCount = (state: RootState) => state.packs.params.min
const selectMaxCardsCount = (state: RootState) => state.packs.params.max
const selectSearchValue = (state: RootState) => state.packs.params.packName

export {
  selectPacks,
  selectCardPacksTotalCount,
  selectPage,
  selectPageCount,
  selectMinCardsCount,
  selectMaxCardsCount,
  selectAuthorizedUserId,
  selectSearchValue
}