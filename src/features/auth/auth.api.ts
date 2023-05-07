import { instance } from "common/api/common.api"
import {
  ArgForgotPasswordType,
  ArgLoginType,
  ArgRegisterType, NewPassReqType,
  ProfileType,
  RegisterResponseType, UpdateProfileDataType
} from "common/types/types"

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg)
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", arg)
  },
  logout: () => {
    return instance.delete("auth/me")
  },
  forgotPassword: (arg: ArgForgotPasswordType) => {
    return instance.post("auth/forgot", arg)
  },
  setNewPassword: (arg: NewPassReqType) => {
    return instance.post(`auth/set-new-password/`, arg)
  },
  me: () => {
    return instance.post<ProfileType>("auth/me")
  },
  updateProfileData: (arg: UpdateProfileDataType) => {
    return instance.put<ProfileType>('auth/me', arg)
  }
}