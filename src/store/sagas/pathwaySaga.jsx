import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { put, call } from "redux-saga/effects";
import TYPES from "store/types";

function* pathwaySaga({ payload }) {
  const data = yield call(get, payload.pathwayId);
  yield put({ type: TYPES.PATHWAY_LOAD, payload: data });
}

function get(id) {
  return firestoreClient
    .collection("pathways")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = {
          id: id  ,
          saved: true,
          ...doc.data(),
        };
        return data;
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
export default pathwaySaga;
