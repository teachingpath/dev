import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import uuid from "components/helpers/uuid";

export const create = (data) => {
  const pathwayId = uuid();
  const user = firebaseClient.auth().currentUser;
  const tags = data.tags.split(",").map((item) => {
    return item.trim().toLowerCase();
  });
  const searchTypes = data.name.toLowerCase() + " " + data.tags.toLowerCase();
  return firestoreClient
    .collection("pathways")
    .doc(pathwayId)
    .set({
      ...data,
      name: data.name,
      searchTypes: searchTypes,
      tags: tags,
      draft: true,
      leaderId: user.uid,
      date: new Date(),
    });
};

export const update = (id, data) => {
  const tags = data.tags.split(",").map((item) => {
    return item.trim().toLowerCase();
  });
  const searchTypes = data.name.toLowerCase() + " " + data.tags.toLowerCase();
  const dataUpdated = {
    ...data,
    draft: true,
    name: data.name,
    tags: tags,
    searchTypes: searchTypes,
    date: new Date(),
  };
  return firestoreClient
    .collection("pathways")
    .doc(id)
    .update(dataUpdated)
    .then(() => dataUpdated);
};

export const updateTrophy = (pathwayId, data) => {
  return firestoreClient
    .collection("pathways")
    .doc(pathwayId)
    .update({
      trophy: {
        ...data,
      },
    });
};

export const updateToDraft = (pathwayId) => {
  return firestoreClient.collection("pathways").doc(pathwayId).update({
    draft: true,
  });
};
export const get = (id, resolve, reject) => {
  firestoreClient
    .collection("pathways")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = {
          id,
          saved: true,
          ...doc.data(),
        };
        resolve({ ...data });
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      reject();
    });
};
