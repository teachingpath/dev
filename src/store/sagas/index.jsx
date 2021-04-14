import { takeEvery } from "redux-saga/effects"
import themeSaga from "./themeSaga"
import activitySaga from "./activitySaga"

import TYPES from "store/types"

function* rootSaga() {
  yield takeEvery(TYPES.PAGE_CHANGE_THEME, themeSaga);
  yield takeEvery(TYPES.ACTIVITY_CHANGE, activitySaga)
}

export default rootSaga
