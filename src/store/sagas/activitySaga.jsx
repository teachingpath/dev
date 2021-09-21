import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { put, select } from "redux-saga/effects";
import { userChange } from "store/actions/userAction";

function* activitySaga({ payload }) {
  const user = firebaseClient.auth().currentUser;
  addActivity(user, payload);
  switch (payload.type) {
    case "start_pathway":
      addPoint(user, payload.point || 1);
      break;
    case "complete_track":
      addPoint(user, payload.point || 5);
      break;
    case "complete_quiz":
      addPoint(user, payload.point || 10);
      break;
    case "complete_pathway":
      addPoint(user, payload.point || 100);
      break;
    case "new_track_response":
      addPoint(user, payload.point || 1);
      break;
    default:
      break;
  }
}

function addActivity(user, payload) {
  firestoreClient
    .collection("activities")
    .add({
      ...payload,
      date: new Date(),
      leaderId: user.uid,
    })
    .catch((error) => {
      console.error("Error adding document in activitySaga: ", error);
    });
}

function* addPoint(user, point) {
  const increment = firebaseClient.firestore.FieldValue.increment(point);
  const dataUser = yield select((state) => state.user);

  yield put(userChange({
    ...dataUser,
    point:dataUser.point + point
  }));

  firestoreClient
    .collection("users")
    .doc(user.uid)
    .update({
      point: increment,
    })
    .catch((error) => {
      console.error("Error adding document in activitySaga: ", error);
    });
}

export default activitySaga;
