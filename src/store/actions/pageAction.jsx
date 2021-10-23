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

export function pageShowAlert(msn, icon="success") {
  return {
    type: TYPES.SHOW_TOAST,
    payload: {msn, icon}
  }
}

export function pageCloseAlert() {
  return {
    type: TYPES.SHOW_TOAST,
    payload: undefined
  }
}

