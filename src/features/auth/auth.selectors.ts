import { RootState } from "app/store"

const selectProfile = (state: RootState) => state.auth.profile

export {selectProfile}