import TYPES from "store/types"

export function breadcrumbChange(payload) {
  return {
    type: TYPES.BREADCRUMB_CHANGE,
    payload: payload
  }
}
