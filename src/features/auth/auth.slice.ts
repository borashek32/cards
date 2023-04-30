import { createSlice } from "@reduxjs/toolkit"
import {
  ArgForgotType,
  ArgLoginType,
  ArgRegisterType,
  authApi,
  ProfileType
} from "features/auth/auth.api"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"


const register = createAppAsyncThunk<void, ArgRegisterType>
  ("auth/sign-up", async (arg) => {
    await authApi.register(arg)
  }
)
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
  ("auth/login", async (arg, thunkAPI) => {
    const res = await authApi.login(arg)
    return { profile: res.data }
  }
)
const forgotPassword = createAppAsyncThunk<void, ArgForgotType>
("auth/forgot-password", async (arg) => {
    await authApi.forgotPassword(arg)
  }
)


const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isLoggedIn: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile
      state.isLoggedIn = true
    })
  }
})

export const authThunks = { register, login, forgotPassword }
export const authReducer = slice.reducer