import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  system_modules: [],
}

const systemModuleSlice = createSlice({
  name: 'system_modules',
  initialState: initialState,
  reducers: {
    createAction: (state, action) => {
      return { ...state, system_modules: [...state.system_modules, action.payload] }
    },
    listAction: (state, action) => {
      return { ...state, system_modules: action.payload }
    },
    updateAction: (state, action) => {
      return { ...state, system_modules: state.system_modules.map(sm => (sm.id === action.payload.id ? action.payload : sm)) }
    },
    deleteAction: (state, action) => {
      return { ...state, system_modules: state.system_modules.filter(sm => sm.id !== action.payload.id) }
    }
  },
})

export const {
  createAction,
  listAction,
  updateAction,
  deleteAction,
} = systemModuleSlice.actions
export default systemModuleSlice.reducer
