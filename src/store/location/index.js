import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address: {
    location: {},
  }
}

const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    setAddress: (state, action) => {
      return { ...state, address: action.payload }
    },
  },
})

export const {
  setAddress,
} = locationSlice.actions

export default locationSlice.reducer
