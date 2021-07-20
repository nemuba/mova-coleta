import { isAuthenticated } from '../../services/auth'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: isAuthenticated(),
  user: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginAction: (state, action) => {
      return { ...state, isAuthenticated: true }
    },
    logoutAction: (state, action) => {
      return { ...state, isAuthenticated: false }
    },
    currentUserAction: (state, action) => {
      return { ...state, user: action.payload }
    },
    signupAction: (state, action) => {
      return { ...state, isAuthenticated: true }
    }
  },
})

export const {
  loginAction,
  logoutAction,
  currentUserAction,
  signupAction,
} = authSlice.actions
export default authSlice.reducer
