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
