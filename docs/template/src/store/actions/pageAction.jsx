import TYPES from "store/types"

export function pageChangeHeaderTitle(payload) {
  return {
    type: TYPES.PAGE_CHANGE_HEADER_TITLE,
    payload: payload
  }
}

export function pageChangeTheme(payload) {
  return {
    type: TYPES.PAGE_CHANGE_THEME,
    payload: payload
  }
}
