import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  collects: [],
  collect: null,
  loading: false,
  error: null,
}

export const fetchAllCollects = createAsyncThunk('collects/fetchAllCollects', async () => {
  const response = await api.get('/collect/collects')
  return response.data
})

export const fetchFindCollect = createAsyncThunk('collects/fetchFindCollect', async (id) => {
  const response = await api.get(`/collect/collects/${id}`)
  return response.data
})

export const fetchCreateCollect = createAsyncThunk('collects/fetchCreateCollect',
  async (collect, { rejectWithValue }) => {
    try {
      const response = await api.post('/collect/collects', { collect })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchUpdateCollect = createAsyncThunk('collects/fetchUpdateCollect',
  async (collect, { rejectWithValue }) => {
    try {
      const response = await api.put(`/collect/collects/${collect.id}`, { collect })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchDeleteCollect = createAsyncThunk('collects/fetchDeleteCollect',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/collect/collects/${id}`)
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


const collectSlice = createSlice({
  name: 'collects',
  initialState: initialState,
  extraReducers: {
    [fetchAllCollects.pending]: pending,
    [fetchAllCollects.rejected]: rejected,
    [fetchAllCollects.fulfilled]: (state, action) => {
      state.collects = action.payload
      state.loading = false
      state.error = null
    },
    [fetchFindCollect.pending]: pending,
    [fetchFindCollect.rejected]: rejected,
    [fetchFindCollect.fulfilled]: (state, action) => {
      state.collect = action.payload
      state.loading = false
      state.error = null
    },
    [fetchCreateCollect.pending]: pending,
    [fetchCreateCollect.rejected]: rejected,
    [fetchCreateCollect.fulfilled]: (state, action) => {
      state.collects = [...state.collects, action.payload]
      state.loading = false
      state.error = null
    },
    [fetchUpdateCollect.pending]: pending,
    [fetchUpdateCollect.rejected]: rejected,
    [fetchUpdateCollect.fulfilled]: (state, action) => {
      state.collects = state.collects.map(collect => collect.id === action.payload.id ? action.payload : collect)
      state.loading = false
      state.error = null
    },
    [fetchDeleteCollect.pending]: pending,
    [fetchDeleteCollect.rejected]: rejected,
    [fetchDeleteCollect.fulfilled]: (state, action) => {
      state.collects = state.collects.filter(collect => collect.id !== action.payload)
      state.loading = false
      state.error = null
    }

  },
})

export default collectSlice.reducer
