import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import uuid from "components/helpers/uuid";

export const create = (runnerId, data) => {
  const trackId = uuid();
  const searchRegExp = /\s/g;
  const replaceWith = "-";
  const user = firebaseClient.auth().currentUser;
  const searchTypes = data.name.toLowerCase();
  const model = {
    level: 1,
    id: trackId,
    leaderId: user.uid,
    searchTypes,
    slug: searchTypes.replace(searchRegExp, replaceWith),
    ...data,
  };
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("tracks")
    .doc(trackId)
    .set(model)
    .then(() => {
      return model;
    });
};

export const getTrack = (pathwayId, runnerId, trackId, resolve, reject) => {
  firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("tracks")
    .doc(trackId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        resolve({
          id: trackId,
          pathwayId,
          runnerId,
          trackId,
          saved: true,
          ...doc.data(),
        });
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      reject();
    });
};

export const updateTrack = (runnerId, trackId, data) => {
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("tracks")
    .doc(trackId)
    .update({
      ...data,
    });
};


export const getTracks = (runnerId, resolve, reject) => {
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("tracks")
    .orderBy("level")
    .get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        list.push(data);
      });
      if(resolve)  resolve({ list });
      return list;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      if(reject) reject();
    });
}
