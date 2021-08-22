import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import sidebarShowReducer from './sidebar'
import AuthReducer from './auth'
import ProfileReducer from './profile'
import UsersReducer from './users'
import SystemModuleReducer from './system_modules'
import CollectReducer from './collects'
import RouteReducer from './routes'
import MapReducer from './map'
import LocationReducer from './location'
import RouteCollectReducer from './route_collect'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sidebarShow: sidebarShowReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
  users: UsersReducer,
  system_modules: SystemModuleReducer,
  collects: CollectReducer,
  map: MapReducer,
  location: LocationReducer,
  routes: RouteReducer,
  route_collect: RouteCollectReducer
})

export default rootReducer
