import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: null,
}

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await api.get('/collect/users')
  return response.data
})

export const fetchFindUser = createAsyncThunk('users/fetchFind',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/collect/users/${id}`)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchCreateUser = createAsyncThunk('users/fetchCreate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/collect/users', { user: data })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchUpdateUser = createAsyncThunk('users/fetchUpdate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`/collect/users/${data.id}`, { user: data })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchDeleteUser = createAsyncThunk('users/fetchDelete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/collect/users/${id}`)
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


const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  extraReducers: {
    [fetchAllUsers.pending]: pending,
    [fetchAllUsers.rejected]: rejected,
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload
      state.loading = false
      state.error = null
    },
    [fetchFindUser.pending]: pending,
    [fetchFindUser.rejected]: rejected,
    [fetchFindUser.fulfilled]: (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    [fetchCreateUser.pending]: pending,
    [fetchCreateUser.rejected]: rejected,
    [fetchCreateUser.fulfilled]: (state, action) => {
      state.users = [...state.users, action.payload]
      state.loading = false
      state.error = null
    },
    [fetchUpdateUser.pending]: pending,
    [fetchUpdateUser.rejected]: rejected,
    [fetchUpdateUser.fulfilled]: (state, action) => {
      const users = state.users.map(user => user.id !== action.payload.id ? user : action.payload)
      state.users = users
      state.loading = false
      state.error = null
    },
    [fetchDeleteUser.pending]: pending,
    [fetchDeleteUser.rejected]: rejected,
    [fetchDeleteUser.fulfilled]: (state, action) => {
      const users = state.users.filter(user => user.id !== action.payload.id)
      state.users = users
      state.loading = false
      state.error = null
    },
  },
})


export default userSlice.reducer
