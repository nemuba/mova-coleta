import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location: []
}

const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    setLocation: (state, action) => {
      return { ...state, location: action.payload }
    },
  },
})

export const {
  setLocation,
} = locationSlice.actions

export default locationSlice.reducer
