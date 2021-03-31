import TYPES from "store/types"

const initialState = {
  agenda: false,
  setting: false
}

function sidemenuReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SIDEMENU_TOGGLE:
      return {
        ...state,
        [action.payload]: !state[action.payload]
      }
    case TYPES.SIDEMENU_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    default:
      return state
  }
}

export default sidemenuReducer
