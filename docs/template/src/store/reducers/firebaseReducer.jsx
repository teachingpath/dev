import TYPES from "store/types"

const initialState = null

function firebaseReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.FIREBASE_CHANGE:
      return action.payload
    default:
      return state
  }
}

export default firebaseReducer
