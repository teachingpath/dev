import TYPES from "store/types"

export function activityChange(payload) {
  return {
    type: TYPES.ACTIVITY_CHANGE,
    payload: payload
  }
}
