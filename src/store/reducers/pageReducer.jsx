import TYPES from "store/types"

const initialState = {
  theme: "light",
  headerTitle: "Untitled"
}

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.PAGE_CHANGE_HEADER_TITLE:
      return {
        ...state,
        headerTitle: action.payload
      }
    case TYPES.PAGE_CHANGE_THEME:
      return {
        ...state,
        theme: action.payload
      }
    default:
      return state
  }
}

export default pageReducer
