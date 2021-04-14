import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";

function* activitySaga({ payload }) {
  const user = firebaseClient.auth().currentUser;
  addActivity(user, payload);
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

export default activitySaga;
