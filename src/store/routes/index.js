import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  routes: [],
  route: null,
  loading: false,
  error: null,
}

export const fetchAllRoutes = createAsyncThunk('routes/fetchAllRoutes', async () => {
  const response = await api.get('/collect/routes')
  return response.data
})

export const fetchFindRoute = createAsyncThunk('routes/fetchFindRoute',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/collect/routes/${id}`)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchCreateRoute = createAsyncThunk('routes/fetchCreateRoute',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/collect/routes', { route: data })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchUpdateRoute = createAsyncThunk('routes/fetchUpdateRoute',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`/collect/routes/${data.id}`, { route: data })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchDeleteRoute = createAsyncThunk('routes/fetchDeleteRoute',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/collect/routes/${id}`)
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

const routeSlice = createSlice({
  name: 'routes',
  initialState: initialState,
  extraReducers: {
    [fetchAllRoutes.pending]: pending,
    [fetchAllRoutes.rejected]: rejected,
    [fetchAllRoutes.fulfilled]: (state, action) => {
      state.routes = action.payload
      state.loading = false
      state.error = null
    },
    [fetchFindRoute.pending]: pending,
    [fetchFindRoute.rejected]: rejected,
    [fetchFindRoute.fulfilled]: (state, action) => {
      state.route = action.payload
      state.loading = false
      state.error = null
    },
    [fetchCreateRoute.pending]: pending,
    [fetchCreateRoute.rejected]: rejected,
    [fetchCreateRoute.fulfilled]: (state, action) => {
      state.routes = [...state.routes, action.payload]
      state.loading = false
      state.error = null
    },
    [fetchUpdateRoute.pending]: pending,
    [fetchUpdateRoute.rejected]: rejected,
    [fetchUpdateRoute.fulfilled]: (state, action) => {
      state.routes = state.routes.map(route => route.id !== action.payload.id ? route : action.payload)
      state.loading = false
      state.error = null
    },
    [fetchDeleteRoute.pending]: pending,
    [fetchDeleteRoute.rejected]: rejected,
    [fetchDeleteRoute.fulfilled]: (state, action) => {
      state.routes = state.routes.filter(route => route.id !== action.payload.id)
      state.loading = false
      state.error = null
    },
  },
})

export default routeSlice.reducer
