import TYPES from "store/types"

export function sidemenuToggle(payload) {
  return {
    type: TYPES.SIDEMENU_TOGGLE,
    payload: payload
  }
}

export function sidemenuChange(payload) {
  return {
    type: TYPES.SIDEMENU_CHANGE,
    payload: {
      name: payload.name,
      value: payload.value
    }
  }
}
