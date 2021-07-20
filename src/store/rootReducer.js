import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import sidebarShowReducer from './sidebar'
import AuthReducer from './auth'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sidebarShow: sidebarShowReducer,
  auth: AuthReducer,
})

export default rootReducer
