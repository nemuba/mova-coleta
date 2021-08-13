import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collects: [],
  collect: {}
}

const collectSlice = createSlice({
  name: 'collects',
  initialState: initialState,
  reducers: {
    createAction: (state, action) => {
      return { ...state, collects: [...state.collects, action.payload] }
    },
    listAction: (state, action) => {
      return { ...state, collects: action.payload }
    },
    updateAction: (state, action) => {
      return { ...state, collects: state.collects.map(collect => (collect.id === action.payload.id ? action.payload : collect)) }
    },
    deleteAction: (state, action) => {
      return { ...state, collects: state.collects.filter(collect => collect.id !== action.payload.id) }
    },
    setAction: (state, action) => {
      return { ...state, collect: action.payload }
    }
  },
})

export const {
  createAction,
  listAction,
  updateAction,
  deleteAction,
  setAction
} = collectSlice.actions
export default collectSlice.reducer
