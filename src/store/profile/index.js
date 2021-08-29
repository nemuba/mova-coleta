import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  profile: null,
  loading: false,
  error: null,
}

export const fetchAddProfile = createAsyncThunk('profile/fetchAddProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/collect/profiles', { profile: data })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchUpdateProfile = createAsyncThunk('profile/fetchUpdateProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`/collect/profiles/${data.id}`, { profile: data })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const pending = (state, action) => {
  state.loading = true
  state.error = null
}

const rejected = (state, action) => {
  state.loading = false
  state.error = action.error.message
}

const fulfilled = (state, action) => {
  state.loading = false
  state.error = null
  state.profile = action.payload
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    createAction: (state, action) => {
      return { ...state, profile: action.payload }
    },
    updateAction: (state, action) => {
      return { ...state, profile: action.payload }
    }
  },
  extraReducers: {
    [fetchAddProfile.pending]: pending,
    [fetchAddProfile.fulfilled]: fulfilled,
    [fetchAddProfile.rejected]: rejected,
    [fetchUpdateProfile.pending]: pending,
    [fetchUpdateProfile.fulfilled]: fulfilled,
    [fetchUpdateProfile.rejected]: rejected,
  },
})

export const { createAction, updateAction } = profileSlice.actions
export default profileSlice.reducer
