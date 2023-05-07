import {createSlice} from "@reduxjs/toolkit"
import {ArgForgotPasswordType, ArgLoginType, ArgRegisterType, NewPassReqType, ProfileType, TokenResponseType, UpdateProfileDataType} from "common/types/types"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import {thunkTryCatch} from "common/utils/thunk-try-catch"
import {authApi} from "features/auth/auth.api"
import {appActions} from "app/app.slice"


const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
("app/initialize-app", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppInitialized({ isAppInitialized: true }))
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.me()
    if (res.data) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(null)
    }
  }, false)
})
const authMe = createAppAsyncThunk<{ profile: ProfileType }>
('auth/me', async () => {
  const res = await authApi.me()
  return { profile: res.data }
})
const register = createAppAsyncThunk<void, ArgRegisterType>
("auth/register", async (arg: ArgRegisterType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.register(arg)
  }, false)
})
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
("auth/login", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.login(arg);
    return { profile: res.data };
  }, false);
})
const logout = createAppAsyncThunk<void>
("auth/logout", async () => {
  await authApi.logout()
})
const forgotPassword = createAppAsyncThunk<TokenResponseType, ArgForgotPasswordType>
("auth/forgot-password", async (arg) => {
  const response = await authApi.forgotPassword(arg)
  return response.data
})
const setNewPassword = createAppAsyncThunk<void, NewPassReqType>
(`auth/set-new-password/:token`, async (arg) => {
  await authApi.setNewPassword(arg)
})
const updateProfile = createAppAsyncThunk<{ profile: ProfileType }, UpdateProfileDataType>
("auth/update-profile-data", async (arg) => {
  const res = await authApi.updateProfileData(arg)
  return { profile: res.data }
})


const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isLoggedIn: false,
    authError: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile
        state.isLoggedIn = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.profile = null
        state.isLoggedIn = false
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
        state.isLoggedIn = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.profile = action.payload.profile
      })
      // how to work with errors
      // .addCase(register.rejected, (state, action) => {
      //   state.authError = action.payload
      // })
  }
})

export const authThunks = {
  register,
  login,
  forgotPassword,
  setNewPassword,
  logout,
  initializeApp ,
  updateProfile,
  authMe
}
export const authReducer = slice.reducer