import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import rootReducers from './rootReducer'

export const history = createBrowserHistory()

export default configureStore({
  reducer: rootReducers(history),
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
  devTools: process.env.NODE_ENV !== 'production'
})
