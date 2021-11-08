import { StackActions } from '@react-navigation/routers'
import { createSlice } from '@reduxjs/toolkit'
import { rootNavRef } from '@src/navigtation/RootNavigation'
import { showSuccessSnackbar } from '@src/utils'
import { loginAsync, signupAsync } from './auth.async'
import { AuthState } from './auth.types'

const initialState: AuthState = {
  loggingIn: false,
  signupIn: false,
  user: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loggingIn = true
    })
    builder.addCase(loginAsync.rejected, (state) => {
      state.loggingIn = false
    })
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loggingIn = false
      state.user = action.payload
      rootNavRef.current?.dispatch(StackActions.replace('AppHome'))
    })
    builder.addCase(signupAsync.pending, (state) => {
      state.signupIn = true
    })
    builder.addCase(signupAsync.rejected, (state) => {
      state.signupIn = false
    })
    builder.addCase(signupAsync.fulfilled, (state, action) => {
      state.signupIn = false
      state.user = action.payload
      showSuccessSnackbar('Signup successfull')
      rootNavRef.current?.dispatch(StackActions.replace('AppHome'))
    })
  },
})

export const { reducer: authReducer } = authSlice
