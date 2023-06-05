import { RootState } from "app/store"

const selectProfile = (state: RootState) => state.auth.profile
const selectAuthorizedUserId = (state: RootState) => state.auth.profile?._id

export {
  selectProfile,
  selectAuthorizedUserId
}