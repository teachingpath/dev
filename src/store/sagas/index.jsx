import { takeEvery } from "redux-saga/effects"
import themeSaga from "./themeSaga"
import activitySaga from "./activitySaga"
import runnerSaga from "./runnerSaga"
import pathwaySaga from "./pathwaySaga"


import TYPES from "store/types"

function* rootSaga() {
  yield takeEvery(TYPES.PAGE_CHANGE_THEME, themeSaga);
  yield takeEvery(TYPES.ACTIVITY_CHANGE, activitySaga);
  yield takeEvery(TYPES.GET_PATHWAY, pathwaySaga);
  yield takeEvery(TYPES.GET_RUNNER, runnerSaga)

}

export default rootSaga
