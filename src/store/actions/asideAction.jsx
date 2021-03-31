import TYPES from "store/types"

export function asideToggle() {
  return { type: TYPES.ASIDE_TOGGLE }
}

export function asideChange(payload) {
  return {
    type: TYPES.ASIDE_CHANGE,
    payload: {
      desktopMinimized: payload.desktopMinimized,
      mobileMinimized: payload.mobileMinimized
    }
  }
}
