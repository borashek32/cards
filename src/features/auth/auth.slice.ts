import {createSlice} from "@reduxjs/toolkit"
import {
  ArgForgotPasswordType,
  ArgLoginType,
  ArgRegisterType,
  NewPassReqType,
  ProfileType,
  TokenResponseType,
  UpdateProfileDataType
} from "./auth.types"
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk"
import {authApi} from "features/auth/auth.api"
import {thunkTryCatch} from "common/utils"


const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    authError: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.profile = null
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.profile = action.payload.profile
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile
      })
  }
})


const register = createAppAsyncThunk<void, ArgRegisterType>(
  "auth/register",
  async (arg, thunkAPI
  ) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.register(arg)
  }, false)
})
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>(
  "auth/login",
  async(arg, thunkAPI
  ) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.login(arg);
    return { profile: res.data };
  }, false);
})
const logout = createAppAsyncThunk<void>(
  "auth/logout",
  async (arg, thunkAPI
  ) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.logout()
  }, false)
})
const authMe = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/auth-me",
  async (arg, thunkAPI
  ) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.me()
    return { profile: res.data }
  }, false)
})
const forgotPassword = createAppAsyncThunk<TokenResponseType, ArgForgotPasswordType>(
  "auth/forgot-password",
  async (arg, thunkAPI
  ) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.forgotPassword(arg)
    return res.data
  }, false)
})
const setNewPassword = createAppAsyncThunk<void, NewPassReqType>(
  `auth/set-new-password/:token`,
  async (arg, thunkAPI
  ) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.setNewPassword(arg)
  })
})
const updateProfile = createAppAsyncThunk<{ profile: ProfileType }, UpdateProfileDataType>(
  "auth/update-profile-data",
  async (arg, thunkAPI
  ) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.updateProfileData(arg)
    return { profile: res.data }
  })
})


export const authThunks = {
  register,
  login,
  forgotPassword,
  setNewPassword,
  logout,
  authMe ,
  updateProfile
}
export const authReducer = slice.reducer
export const authActions = slice.actions