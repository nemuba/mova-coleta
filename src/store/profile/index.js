import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  user_id: null,
  name: null,
  email: null,
  phone: null,
  document: null,
  address: {},
  created_at: null,
  updated_at: null
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    createAction: (state, action) => {
      return { ...state, ...action.payload }
    },
    updateAction: (state, action) => {
      return { ...state, ...action.payload }
    }
  },
})

export const {
  createAction,
  updateAction
} = profileSlice.actions
export default profileSlice.reducer
