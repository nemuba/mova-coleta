import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
}

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
  const response = await api.get('/collect/products')
  return response.data
})

export const fetchFindProduct = createAsyncThunk('products/fetchFindProduct', async (id) => {
  const response = await api.get(`/collect/products/${id}`)
  return response.data
})

export const fetchCreateProduct = createAsyncThunk('products/fetchCreateProduct',
  async (product, { rejectWithValue }) => {
    try {
      const response = await api.post('/collect/products', { product })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchUpdateProduct = createAsyncThunk('products/fetchUpdateProduct',
  async (product, { rejectWithValue }) => {
    try {
      const response = await api.put(`/collect/products/${product.id}`, { product })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchDeleteProduct = createAsyncThunk('products/fetchDeleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/collect/products/${id}`)
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

const rejected = (state, {payload}) => {
  state.loading = false
  state.error = payload
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [fetchAllProducts.pending]: pending,
    [fetchAllProducts.rejected]: rejected,
    [fetchAllProducts.fulfilled]: (state, action) => {
      state.products = action.payload
      state.loading = false
      state.error = null
    },
    [fetchFindProduct.pending]: pending,
    [fetchFindProduct.rejected]: rejected,
    [fetchFindProduct.fulfilled]: (state, {payload}) => {
      state.product = payload
      state.loading = false
      state.error = null
    },
    [fetchCreateProduct.pending]: pending,
    [fetchCreateProduct.rejected]: rejected,
    [fetchCreateProduct.fulfilled]: (state, {payload}) => {
      state.products.concat(payload)
      state.loading = false
      state.error = null
    },
    [fetchUpdateProduct.pending]: pending,
    [fetchUpdateProduct.rejected]: rejected,
    [fetchUpdateProduct.fulfilled]: (state, {payload}) => {
      state.products = state.products.map(product => product.id === payload.id ? payload : product)
      state.loading = false
      state.error = null
    },
    [fetchDeleteProduct.pending]: pending,
    [fetchDeleteProduct.rejected]: rejected,
    [fetchDeleteProduct.fulfilled]: (state, {payload}) => {
      state.products = state.products.filter(product => product.id !== payload)
      state.loading = false
      state.error = null
    }
  }
})

export default productSlice.reducer
