import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import sidebarShowReducer from './sidebar'
import AuthReducer from './auth'
import ProfileReducer from './profile'
import UsersReducer from './users'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sidebarShow: sidebarShowReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
  users: UsersReducer
})

export default rootReducer
