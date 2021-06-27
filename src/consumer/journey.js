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

export const enableBadge = (journeyId, runnerId, totalPoints) => {
  return firestoreClient
    .collection("journeys")
    .doc(journeyId)
    .collection("badgets")
    .doc(runnerId)
    .update({
      disabled: false,
      date: new Date(),
      totalPoints: totalPoints,
    });
};

export const updateJourney = (journeyId, data) => {
  return firestoreClient.collection("journeys").doc(journeyId).update(data);
};

export const getJourney = (journeyId, resolve, reject) => {
  firestoreClient
    .collection("journeys")
    .doc(journeyId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        resolve({
          ...doc.data(),
          id: doc.id,
        });
      } else {
        console.log("Empty documents"); 
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      reject();
    });
};

export const deleteJourney = (journeyId) => {
  return firestoreClient
    .collection("journeys")
    .doc(journeyId)
    .delete()
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};
