import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collect_ids: []
}

const routeCollectSlice = createSlice({
  name: 'route_collect',
  initialState: initialState,
  reducers: {
    addCollect: (state, action) => {
      return { ...state, collect_ids: [...state.collect_ids, action.payload] }
    },
    removeCollect: (state, action) => {
      return { ...state, collect_ids: state.collect_ids.filter(item => Number(item.collect_id) !== Number(action.payload)) }
    }
  },
})

export const {
  addCollect,
  removeCollect
} = routeCollectSlice.actions

export default routeCollectSlice.reducer
