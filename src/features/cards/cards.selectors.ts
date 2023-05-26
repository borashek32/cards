import {RootState} from "app/store"

export const selectCards = (state: RootState) => state.cards.cards
export const selectCardsPackId = (state: RootState) => state.cards.selectedCardsPackId
export const selectCardsPackName = (state: RootState) => state.cards.packName