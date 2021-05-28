import TYPES from "store/types"
import PAGE from "config/page.config"

const breakpoint = 1025
const initialState = {
  desktopMinimized: PAGE.layout.minimizedAside,
  mobileMinimized: true
}

function asideReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ASIDE_TOGGLE:
      if (window.innerWidth >= breakpoint) {
        return {
          ...state,
          desktopMinimized: action.payload ? action.payload : !state.desktopMinimized
        }
      } else {
        return {
          ...state,
          mobileMinimized: action.payload ? action.payload : !state.mobileMinimized
        }
      }
    case TYPES.ASIDE_CHANGE:
      return {
        desktopMinimized: action.payload.desktopMinimized
          ? action.payload.desktopMinimized
          : state.desktopMinimized,
        mobileMinimized: action.payload.mobileMinimized
          ? action.payload.mobileMinimized
          : state.mobileMinimized
      }
    default:
      return state
  }
}

export default asideReducer
