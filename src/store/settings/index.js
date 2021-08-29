import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  settings: [],
  setting: null,
  loading: false,
  error: null,
}

export const fetchAllSettings = createAsyncThunk('settings/fetchALL', async () => {
  const response = await api.get('/configs')
  return response.data
})

export const fetchAddSettings = createAsyncThunk('settings/fetchADD',
  async (settingsData) => {
    const response = await api.post('/configs', settingsData)
    return response.data
  }
)

export const fetchDeleteSettings = createAsyncThunk('settings/fetchDESTROY',
  async (settingsData) => {
    await api.delete(`/configs/${settingsData.id}`)
    return settingsData
  }
)

export const fetchFindSettings = createAsyncThunk('settings/fetchFIND',
  async (setting_id) => {
    const response = await api.get(`/configs/${setting_id}`)
    return response.data
  }
)

export const fetchUpdateSettings = createAsyncThunk('settings/fetchUPDATE',
  async (settingsData) => {
    const response = await api.put(`/configs/${settingsData.id}`, settingsData)
    return response.data
  }
)

const pending = (state, action) => {
  state.loading = true
}

const rejected = (state, action) => {
  state.error = action.error.message
  state.loading = false
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  extraReducers: {
    [fetchAllSettings.pending]: pending,
    [fetchAllSettings.rejected]: rejected,
    [fetchAllSettings.fulfilled]: (state, action) => {
      state.settings = action.payload
      state.loading = false
    },
    [fetchAddSettings.pending]: pending,
    [fetchAddSettings.rejected]: rejected,
    [fetchAddSettings.fulfilled]: (state, action) => {
      state.settings.push(action.payload)
      state.loading = false
    },
    [fetchDeleteSettings.pending]: pending,
    [fetchDeleteSettings.rejected]: rejected,
    [fetchDeleteSettings.fulfilled]: (state, action) => {
      state.settings = state.settings.filter(setting => setting.id !== action.payload.id)
      state.loading = false
    },
    [fetchFindSettings.pending]: pending,
    [fetchFindSettings.rejected]: rejected,
    [fetchFindSettings.fulfilled]: (state, action) => {
      state.setting = action.payload
      state.loading = false
    },
    [fetchUpdateSettings.pending]: pending,
    [fetchUpdateSettings.rejected]: rejected,
    [fetchUpdateSettings.fulfilled]: (state, action) => {
      const settings = state.settings.filter(setting => setting.id !== action.payload.id)
      state.settings = [...settings, action.payload]
      state.loading = false
    }
  },
})

export default settingsSlice.reducer


