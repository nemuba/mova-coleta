import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
}

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    createAction: (state, action) => {
      return { ...state, users: [...state.users, action.payload] }
    },
    listAction: (state, action) => {
      return { ...state, users: action.payload }
    },
    updateAction: (state, action) => {
      return { ...state, users: state.users.map(user => (user.id === action.payload.id ? action.payload : user) ) }
    },
    deleteAction: (state, action) => {
      return { ...state, users: state.users.filter(user => user.id !== action.payload.id) }
    }
  },
})

export const {
  createAction,
  listAction,
  updateAction,
  deleteAction,
} = userSlice.actions
export default userSlice.reducer
