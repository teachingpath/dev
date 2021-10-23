import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { put, select } from "redux-saga/effects";
import { pageShowAlert, userChange} from "store/actions";

function* activitySaga({ payload }) {
  const user = firebaseClient.auth().currentUser;
  const dataUser = yield select((state) => state.user);
  let point = 1;
  addActivity(user, payload);
  switch (payload.type) {
    case "start_pathway":
      point = payload.point || 1;
      addPoint(user, point);
      yield put( userChange({ ...dataUser, point: dataUser.point + point, }) );
      yield put(pageShowAlert("Excelente! obtuviste +"+point+" puntos por iniciar el pathway"))
      break;
    case "complete_track":
      point = payload.point || 5;
      addPoint(user, point);
      yield put(userChange({ ...dataUser, point: dataUser.point + point,}));
      yield put(pageShowAlert("¡Excelente! obtuviste +"+point+" puntos por completar el track"))
      break;
    case "complete_quiz":
      point = payload.point || 10;
      addPoint(user, point);
      yield put( userChange({ ...dataUser,point: dataUser.point + point, }));
      yield put(pageShowAlert("¡Felicidades! obtuviste +"+point+" puntos por completar el quiz"))
      break;
    case "complete_pathway":
      point = payload.point || 100;
      addPoint(user, point);
      yield put( userChange({ ...dataUser, point: dataUser.point + point, }));
      yield put(pageShowAlert("¡Felicidades! obtuviste +"+point+" puntos por completar el pathway"))
      break;
    case "new_track_response":
      point = payload.point || 1;
      addPoint(user, point);
      yield put(userChange({ ...dataUser, point: dataUser.point + point}));
      yield put(pageShowAlert("¡Muy Bien! obtuviste +"+point+" puntos por responder al track"))
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

function addPoint(user, point) {
  const increment = firebaseClient.firestore.FieldValue.increment(point);
  firestoreClient
    .collection("users")
    .doc(user.uid)
    .update({
      point: increment,
    })
    .then(() => {
      console.log("add updated");
    })
    .catch((error) => {
      console.error("Error adding document in activitySaga: ", error);
    });
}

export default activitySaga;
