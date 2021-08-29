import { isAuthenticated } from '../../services/auth'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  isAuthenticated: isAuthenticated(),
  user: null,
  loading: false,
  error: null,
}

export const fetchLoginAuth = createAsyncThunk('auth/fetchLoginAuth',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/sign_in', { auth: data })
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchRegisterAuth = createAsyncThunk('auth/fetchRegisterAuth',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/sign_up', { auth: data })
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser',
  async () => {
    const response = await api.get('/currentusers')
    return response.data
  }
)

const pending = (state, action) => {
  state.loading = true
  state.error = null
}

const rejected = (state, action) => {
  state.error = action.error.message
  state.loading = false
}

const fulfilled = (state, action) => {
  state.isAuthenticated = true
  state.user = action.payload
  state.loading = false
  state.error = null
}



const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logoutAction: (state, action) => {
      return { ...state, isAuthenticated: false, user: null }
    },
  },
  extraReducers: {
    [fetchLoginAuth.pending]: pending,
    [fetchLoginAuth.rejected]: rejected,
    [fetchLoginAuth.fulfilled]: fulfilled,
    [fetchRegisterAuth.pending]: pending,
    [fetchRegisterAuth.rejected]: rejected,
    [fetchRegisterAuth.fulfilled]: fulfilled,
    [fetchCurrentUser.pending]: pending,
    [fetchCurrentUser.rejected]: rejected,
    [fetchCurrentUser.fulfilled]: fulfilled,
  },
})

export const {
  loginAction,
  logoutAction,
  currentUserAction,
  signupAction,
} = authSlice.actions
export default authSlice.reducer
