import {RootState} from "app/store"


const selectCards = (state: RootState) => state.cards.cards
const selectCardsPackId = (state: RootState) => state.cards.selectedCardsPackId
const selectCardsPackName = (state: RootState) => state.cards.packName
const selectPackUserId = (state: RootState) => state.cards.packUserId

const selectSearchCardQuestion = (state: RootState) => state.cards.params.cardQuestion
const selectSearchCardAnswer = (state: RootState) => state.cards.params.cardAnswer
const selectPage = (state: RootState) => state.cards.params.page
const selectPageCount = (state: RootState) => state.cards.params.pageCount

const selectPackCardsCount = (state: RootState) => state.cards.cardsTotalCount

export {
  selectCards,
  selectCardsPackId,
  selectCardsPackName,
  selectPackUserId,
  selectSearchCardQuestion,
  selectSearchCardAnswer,
  selectPage,
  selectPageCount,
  selectPackCardsCount
}