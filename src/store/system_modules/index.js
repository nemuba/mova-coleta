import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  system_modules: [],
  system_module: null,
  loading: false,
  error: null
}

export const fetchAllSystemModules = createAsyncThunk('system_modules/fetchAll', async () => {
  const response = await api.get('/systemmodules')
  return response.data
})

export const fetchFindSystemModule = createAsyncThunk('system_modules/fetchFind',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/systemmodules/${id}`)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchCreateSystemModule = createAsyncThunk('system_modules/fetchCreate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/systemmodules', { system_module: data })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchUpdateSystemModule = createAsyncThunk('system_modules/fetchUpdate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`/systemmodules/${data.id}`, { system_module: data })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchDeleteSystemModule = createAsyncThunk('system_modules/fetchDelete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/systemmodules/${id}`)
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


const systemModuleSlice = createSlice({
  name: 'system_modules',
  initialState: initialState,
  extraReducers: {
    [fetchAllSystemModules.pending]: pending,
    [fetchAllSystemModules.rejected]: rejected,
    [fetchAllSystemModules.fulfilled]: (state, action) => {
      state.system_modules = action.payload
      state.loading = false
      state.error = null
    },
    [fetchFindSystemModule.pending]: pending,
    [fetchFindSystemModule.rejected]: rejected,
    [fetchFindSystemModule.fulfilled]: (state, action) => {
      state.system_module = action.payload
      state.loading = false
      state.error = null
    },
    [fetchCreateSystemModule.pending]: pending,
    [fetchCreateSystemModule.rejected]: rejected,
    [fetchCreateSystemModule.fulfilled]: (state, action) => {
      state.system_modules = [...state.system_modules, action.payload]
      state.loading = false
      state.error = null
    },
    [fetchUpdateSystemModule.pending]: pending,
    [fetchUpdateSystemModule.rejected]: rejected,
    [fetchUpdateSystemModule.fulfilled]: (state, action) => {
      state.system_modules = state.system_modules.map(system_module =>
        system_module.id === action.payload.id ? action.payload : system_module
      )
      state.loading = false
      state.error = null
    },
    [fetchDeleteSystemModule.pending]: pending,
    [fetchDeleteSystemModule.rejected]: rejected,
    [fetchDeleteSystemModule.fulfilled]: (state, action) => {
      state.system_modules = state.system_modules.filter(system_module => system_module.id !== action.payload.id)
      state.loading = false
      state.error = null
    }
  },
})

export default systemModuleSlice.reducer
