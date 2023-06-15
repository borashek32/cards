import { RootState } from "app/store"

const selectProfile = (state: RootState) => state.auth.profile
const selectUserName = (state: RootState) => state.auth.profile?.name
const selectAuthorizedUserId = (state: RootState) => state.auth.profile?._id
const selectProfileAvatar = (state: RootState) => state.auth.profile?.avatar

export {
  selectProfile,
  selectUserName,
  selectAuthorizedUserId,
  selectProfileAvatar
}