import { firestoreClient } from "components/firebase/firebaseClient";
export const searchPathways = (tags, q, resolve, reject) => {
  let db = firestoreClient.collection("pathways").where("draft", "==", false);
  if (q) {
    db = db
      .where("searchTypes", ">=", q)
      .where("searchTypes", "<=", q + "\uf8ff");
  }
  if (tags) {
    db = db.where("tags", "array-contains", tags);
  }
  db.get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      resolve({ data: list });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      reject();
    });
};
