import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import uuid from "components/helpers/uuid";

export const getBadges = (journeyId, resolve, reject) => {
  firestoreClient
    .collection("journeys")
    .doc(journeyId)
    .collection("badgets")
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        resolve({ data: list });
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      reject();
    });
};

export const getBadgesByUser = (resolve, reject) => {
  const user = firebaseClient.auth().currentUser;
  firestoreClient
    .collection("journeys")
    .where("userId", "==", user.uid)
    .get()
    .then(async (querySnapshot) => {
      const dataList = [];
      if (!querySnapshot.empty) {
        const response = await querySnapshot.forEach((doc) => {
          firestoreClient
            .collection("journeys")
            .doc(doc.id)
            .collection("badgets")
            .where("disabled", "==", false)
            .get()
            .then((querySnapshot) => {
              const list = dataList;
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  list.push(doc.data());
                });
              }

              return list;
            });
        });

        resolve({ data: dataList });
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      reject();
    });
};
