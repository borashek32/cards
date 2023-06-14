import {RootState} from "app/store"


const selectPacks = (state: RootState) => state.packs.cardPacks
const selectCardPacksTotalCount = (state: RootState) => state.packs.cardsPackTotalCount

const selectPage = (state: RootState) => state.packs.params.page
const selectParams = (state: RootState) => state.packs.params
const selectPageCount = (state: RootState) => state.packs.params.pageCount
const selectMinCardsCount = (state: RootState) => state.packs.params.min
const selectMaxCardsCount = (state: RootState) => state.packs.params.max
const selectSearchPackName = (state: RootState) => state.packs.params.packName
const selectPack = (state: RootState) => state.packs.selectedPack

export {
  selectPacks,
  selectCardPacksTotalCount,
  selectPage,
  selectPageCount,
  selectMinCardsCount,
  selectMaxCardsCount,
  selectSearchPackName,
  selectPack,
  selectParams
}