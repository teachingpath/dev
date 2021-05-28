import TYPES from "store/types"

const initialState = []

function breadcrumbReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.BREADCRUMB_CHANGE:
      return action.payload
    default:
      return state
  }
}

export default breadcrumbReducer
