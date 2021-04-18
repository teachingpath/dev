import TYPES from "store/types"

const initialState = null

function userReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.USER_CHANGE:
      return action.payload
    default:
      return state
  }
}

export default userReducer
