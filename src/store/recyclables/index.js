import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  recyclables: [],
  recyclable: null,
  loading: false,
  error: null,
}

export const fetchAllRecyclables = createAsyncThunk('recyclables/fetchAllRecyclables', async () => {
  const response = await api.get('/recyclables')
  return response.data
})

export const fetchFindRecyclable = createAsyncThunk('recyclables/fetchFindRecyclable', async (id) => {
  const response = await api.get(`/recyclables/${id}`)
  return response.data
})

export const fetchCreateRecyclable = createAsyncThunk('recyclables/fetchCreateRecyclable',
  async (recyclable, { rejectWithValue }) => {
    try {
      const response = await api.post('/recyclables', { recyclable })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchUpdateRecyclable = createAsyncThunk('recyclables/fetchUpdateRecyclable',
  async (recyclable, { rejectWithValue }) => {
    try {
      const response = await api.put(`/recyclables/${recyclable.id}`, { recyclable })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchDeleteRecyclable = createAsyncThunk('recyclables/fetchDeleteRecyclable',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/recyclables/${id}`)
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

const rejected = (state, { payload }) => {
  state.loading = false
  state.error = payload
}

const recyclableSlice = createSlice({
  name: 'recyclables',
  initialState,
  extraReducers: {
    [fetchAllRecyclables.pending]: pending,
    [fetchAllRecyclables.rejected]: rejected,
    [fetchAllRecyclables.fulfilled]: (state, action) => {
      state.recyclables = action.payload
      state.loading = false
      state.error = null
    },
    [fetchFindRecyclable.pending]: pending,
    [fetchFindRecyclable.rejected]: rejected,
    [fetchFindRecyclable.fulfilled]: (state, { payload }) => {
      state.recyclable = payload
      state.loading = false
      state.error = null
    },
    [fetchCreateRecyclable.pending]: pending,
    [fetchCreateRecyclable.rejected]: rejected,
    [fetchCreateRecyclable.fulfilled]: (state, { payload }) => {
      state.recyclables.concat(payload)
      state.loading = false
      state.error = null
    },
    [fetchUpdateRecyclable.pending]: pending,
    [fetchUpdateRecyclable.rejected]: rejected,
    [fetchUpdateRecyclable.fulfilled]: (state, { payload }) => {
      state.recyclables = state.recyclables.map(recyclable => recyclable.id === payload.id ? payload : recyclable)
      state.loading = false
      state.error = null
    },
    [fetchDeleteRecyclable.pending]: pending,
    [fetchDeleteRecyclable.rejected]: rejected,
    [fetchDeleteRecyclable.fulfilled]: (state, { payload }) => {
      state.recyclables = state.recyclables.filter(recyclable => recyclable.id !== payload)
      state.loading = false
      state.error = null
    }
  }
})

export default recyclableSlice.reducer
