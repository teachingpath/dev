import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { put, call } from "redux-saga/effects";
import TYPES from "store/types";

function* runnerSaga({ payload }) {
  const data = yield call(get, {
    runnerId: payload.runnerId,
    pathwayId: payload.pathwayId,
  });
  yield put({ type: TYPES.RUNNER_LOAD, payload: data });
}

function get({ runnerId, pathwayId }) {
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return {
          id: runnerId,
          pathwayId: pathwayId,
          runnerId: runnerId,
          saved: true,
          ...doc.data(),
        };
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

export default runnerSaga;
