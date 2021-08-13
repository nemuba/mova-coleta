import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const mapSlice = createSlice({
  name: 'map',
  initialState: initialState,
  reducers: {
    getLocation: (state, action) => {
      return state = action.payload
    },
    setLocation: (state, action) => {
      return state = action.payload
    }
  },
})

export const {
  getLocation,
  setLocation
} = mapSlice.actions
export default mapSlice.reducer
