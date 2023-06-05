import {RootState} from "app/store"

const selectPacks = (state: RootState) => state.packs.cardPacks
const selectCardPacksTotalCount = (state: RootState) => state.packs.cardsPackTotalCount

const selectPage = (state: RootState) => state.packs.params.page
const selectPageCount = (state: RootState) => state.packs.params.pageCount
const selectMinCardsCount = (state: RootState) => state.packs.params.min
const selectMaxCardsCount = (state: RootState) => state.packs.params.max
const selectSearchValue = (state: RootState) => state.packs.params.packName
const selectPack = (state: RootState) => state.packs.selectedPack

const selectEditPackMode = (state: RootState) => state.packs.editMode
const selectEditPackFormValues = (state: RootState) => state.packs.editPackFormValues

const selectDeletePackMode = (state: RootState) => state.packs.deleteMode
const selectDeletePackFormValues = (state: RootState) => state.packs.deletePackFormValues

export {
  selectPacks,
  selectCardPacksTotalCount,
  selectPage,
  selectPageCount,
  selectMinCardsCount,
  selectMaxCardsCount,
  selectSearchValue,
  selectEditPackMode,
  selectEditPackFormValues,
  selectDeletePackMode,
  selectPack,
  selectDeletePackFormValues
}