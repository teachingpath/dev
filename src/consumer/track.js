import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { createSlug } from "components/helpers/mapper";
import uuid from "components/helpers/uuid";

export const create = (runnerId, data) => {
  const trackId = uuid();
  const user = firebaseClient.auth().currentUser;
  const searchTypes = data.name.toLowerCase();

  const model = {
    level: 100,
    id: trackId,
    leaderId: user.uid,
    searchTypes,
    slug: createSlug(data.name),
    date: Date.now(),
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
      slug: createSlug(data.name),
      date: Date.now(),
    });
};

export const deleteTrack = (runnerId, trackId) => {
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("tracks")
    .doc(trackId)
    .delete();
};

export const updateTrackLevel = (runnerId, trackId, level) => {
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("tracks")
    .doc(trackId)
    .update({
      level: level,
      date: Date.now(),
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
      if (resolve) resolve({ list });
      return list;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      if (reject) reject();
    });
};

export const saveTrackResponse = (trackId, group, data, id = 1) => {
  const user = firebaseClient.auth().currentUser;
  return firestoreClient.collection("track-response").add({
    id,
    trackId,
    group,
    ...data,
    userId: user.uid,
    date: Date.now(),
  });
};

export const getTracksResponses = (trackId, group, resolve, reject) => {
  let db = firestoreClient
    .collection("track-response")
    .orderBy("date", 'desc')
    .where("trackId", "==", trackId);

  if (group) {
    db = db.where("group", "==", group);
  }

  db.limit(20)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        resolve({ list });
      } else {
        resolve({ list: [] });
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      reject();
    });
};

export const getTracksResponseByUserId = (trackId, userId, resolve, reject) => {
  firestoreClient
    .collection("track-response")
    .where("trackId", "==", trackId)
    .where("userId", "==", userId)
    .limit(2)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        resolve({ list });
      } else {
        resolve({ list: [] });
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      reject();
    });
};
