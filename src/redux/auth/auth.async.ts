import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '@src/services'
import { User } from '@src/types/auth.types'
import { getErrorMessage, showErrorSnackbar } from '@src/utils'

export const loginAsync = createAsyncThunk<
  User,
  { password: string; email: string }
>('auth/login', async (data) => {
  try {
    const user = await authService.login(data.email, data.password)
    return user
  } catch (error) {
    const message = getErrorMessage(error)
    showErrorSnackbar(message)
    return Promise.reject(error)
  }
})

export const logoutAsync = createAsyncThunk<string, void>(
  'auth/logout',
  async () => {
    try {
      await authService.logout()
      return 'done'
    } catch (error) {
      const message = getErrorMessage(error)
      showErrorSnackbar(message)
      return Promise.reject(error)
    }
  },
)

export const signupAsync = createAsyncThunk<User, any>(
  'auth/signup',
  async (data) => {
    try {
      const user = await authService.signup(
        data.email,
        data.password,
        data.name,
        data.bloodGroup,
        data.phone,
      )
      return user
    } catch (error) {
      const message = getErrorMessage(error)
      showErrorSnackbar(message)
      return Promise.reject(error)
    }
  },
)
