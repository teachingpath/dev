import TYPES from "store/types"

export function userChange(payload) {
  return {
    type: TYPES.USER_CHANGE,
    payload: payload
  }
}
