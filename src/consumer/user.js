import { firestoreClient } from "components/firebase/firebaseClient";
export const getUser = (leaderId, resolve, reject) => {
  firestoreClient
    .collection("users")
    .doc(leaderId)
    .get()
    .then((doc) => {
      resolve({ data: doc.data() });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      reject();
    });
};

export const getTracksResponses = (userId, group, resolve, reject) => {
  let db = firestoreClient
    .collection("track-response")
    .orderBy("date", "desc")
    .where("userId", "==", userId);

  if (group) {
    db = db.where("group", "==", group);
  }

  return db
    .limit(50)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        return { list };
      } else {
        return { list: [] };
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};
