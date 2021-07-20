import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: 'responsive'
}

const sidebarShowSlice = createSlice({
  name: 'sidebarShow',
  initialState: initialState,
  reducers: {
    setSlide: (state, action) => {

      return { ...state, sidebarShow: action.payload }
    }
  },
})

export const {
  setSlide
} = sidebarShowSlice.actions
export default sidebarShowSlice.reducer
