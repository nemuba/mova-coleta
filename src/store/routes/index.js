import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  routes: [],
  route: {}
}

const routeSlice = createSlice({
  name: 'routes',
  initialState: initialState,
  reducers: {
    createAction: (state, action) => {
      return { ...state, routes: [...state.routes, action.payload] }
    },
    listAction: (state, action) => {
      return { ...state, routes: action.payload }
    },
    updateAction: (state, action) => {
      return { ...state, routes: state.routes.map(route => (route.id === action.payload.id ? action.payload : route)) }
    },
    deleteAction: (state, action) => {
      return { ...state, routes: state.routes.filter(route => route.id !== action.payload.id) }
    },
    setAction: (state, action) => {
      return { ...state, route: action.payload }
    }
  },
})

export const {
  createAction,
  listAction,
  updateAction,
  deleteAction,
  setAction
} = routeSlice.actions
export default routeSlice.reducer
