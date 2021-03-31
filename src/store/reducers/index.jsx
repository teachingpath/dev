import { combineReducers } from "redux"
import breadcrumbReducer from "./breadcrumbReducer"
import sidemenuReducer from "./sidemenuReducer"
import firebaseReducer from "./firebaseReducer"
import asideReducer from "./asideReducer"
import pageReducer from "./pageReducer"

// Concatenate all reducers
const reducers = combineReducers({
  sidemenu: sidemenuReducer,
  breadcrumb: breadcrumbReducer,
  firebase: firebaseReducer,
  aside: asideReducer,
  page: pageReducer
})

export default reducers
