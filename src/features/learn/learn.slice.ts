import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {SetCardDataType} from "features/learn/learn.styles"


const slice = createSlice({
  name: "learn",
  initialState: {
    cardsPack_id: '' as string,
    packName: '',
    question: '',
    answer: '',
    card_id: ''
  },
  reducers: {
    setCardData: (state, action: PayloadAction<{ data: SetCardDataType }>) => {
      state.cardsPack_id = action.payload.data.cardsPack_id || ''
      state.packName = action.payload.data.packName
      state.question = action.payload.data.question
      state.answer = action.payload.data.answer
    }
  }
})

export const learnReducer = slice.reducer
export const learnActions = slice.actions
