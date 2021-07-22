import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: {}
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    createAction: (state, action) => {
      return { ...state, profile: action.payload }
    },
    updateAction: (state, action) => {
      return { ...state, profile: action.payload }
    }
  },
})

export const {
  createAction,
  updateAction
} = profileSlice.actions
export default profileSlice.reducer
