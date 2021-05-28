import TYPES from "store/types"

export function firebaseChange(payload) {
  return {
    type: TYPES.FIREBASE_CHANGE,
    payload: payload
  }
}
