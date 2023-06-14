import {RootState} from "app/store"

const selectPackName = (state: RootState) => state.learn.packName
const selectPackId = (state: RootState) => state.learn.cardsPack_id
const selectCardQuestion = (state: RootState) => state.learn.question
const selectCardAnswer = (state: RootState) => state.learn.answer

export {
  selectPackId,
  selectPackName,
  selectCardQuestion,
  selectCardAnswer
}