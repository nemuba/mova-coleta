import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  customers: [],
  customer: {},
  loading: false,
  error: null,
}

export const fetchAllCustomers = createAsyncThunk('customers/fetchAll', async () => {
  const response = await api.get('/collect/customers')
  return response.data
})

export const fetchFindCustomer = createAsyncThunk('custumers/fetchFind',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/collect/customers/${id}`)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchCreateCustomer = createAsyncThunk('customers/fetchCreate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/collect/customers', { customer: data })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchUpdateCustomer = createAsyncThunk('customers/fetchUpdate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put(`/collect/customers/${data.id}`, { customer: data })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchDeleteCustomer = createAsyncThunk('customers/fetchDelete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/collect/customers/${id}`)
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
    [fetchAllCustomers.pending]: pending,
    [fetchAllCustomers.rejected]: rejected,
    [fetchAllCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload
      state.loading = false
      state.error = null
    },
    [fetchFindCustomer.pending]: pending,
    [fetchFindCustomer.rejected]: rejected,
    [fetchFindCustomer.fulfilled]: (state, action) => {
      state.customer = action.payload
      state.loading = false
      state.error = null
    },
    [fetchCreateCustomer.pending]: pending,
    [fetchCreateCustomer.rejected]: rejected,
    [fetchCreateCustomer.fulfilled]: (state, action) => {
      state.customers = [...state.customers, action.payload]
      state.loading = false
      state.error = null
    },
    [fetchUpdateCustomer.pending]: pending,
    [fetchUpdateCustomer.rejected]: rejected,
    [fetchUpdateCustomer.fulfilled]: (state, action) => {
      const customers = state.customers.map(user => user.id !== action.payload.id ? user : action.payload)
      state.customers = customers
      state.loading = false
      state.error = null
    },
    [fetchDeleteCustomer.pending]: pending,
    [fetchDeleteCustomer.rejected]: rejected,
    [fetchDeleteCustomer.fulfilled]: (state, action) => {
      const customers = state.customers.filter(user => user.id !== action.payload.id)
      state.customers = customers
      state.loading = false
      state.error = null
    },
  },
})


export default userSlice.reducer
