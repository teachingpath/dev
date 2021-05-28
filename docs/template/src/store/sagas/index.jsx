import { takeEvery } from "redux-saga/effects"
import themeSaga from "./themeSaga"
import TYPES from "store/types"

function* rootSaga() {
  yield takeEvery(TYPES.PAGE_CHANGE_THEME, themeSaga)
}

export default rootSaga
