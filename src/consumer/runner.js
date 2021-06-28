import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { createSlug } from "components/helpers/mapper";
import uuid from "components/helpers/uuid";

export const create = (pathwayId, data) => {
  const runnerId = uuid();
  const user = firebaseClient.auth().currentUser;
  const searchTypes = data.name.toLowerCase();

  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .set({
      level: 100,
      leaderId: user.uid,
      pathwayId: pathwayId,
      date: new Date(),
      searchTypes,
      slug: createSlug(data.name),
      ...data,
    })
    .then(() => {
      return {
        id: runnerId,
      };
    });
};

export const update = (runnerId, data) => {
  const searchTypes = data.name.toLowerCase();
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .update({
      ...data,
      searchTypes,
      slug: createSlug(data.name),
    });
};

export const updateLevel = (runnerId, level) => {
  return firestoreClient.collection("runners").doc(runnerId).update({
    level: level,
  });
};

export const updateBadge = (runnerId, data) => {
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .update({
      badge: {
        ...data,
      },
    });
};

export const getQuestions = (runnerId) => {
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("questions")
    .get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return list;
    });
};

export const getQuiz = (pathwayId, runnerId, questionId, resolve, reject) => {
  firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("questions")
    .doc(questionId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        resolve({
          id: questionId,
          pathwayId,
          runnerId,
          questionId,
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

export const updateQuiz = (runnerId, questionId, data) => {
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("questions")
    .doc(questionId)
    .update({
      question: data.question,
      type: data.type,
      options: data.options.map((item, index) => {
        return {
          name: item.name,
          isCorrect:
            data.type === "multiple"
              ? item.isCorrect === true
              : data.options.isCorrect === index,
        };
      }),
    });
};

export const createQuiz = (runnerId, data) => {
  const questionId = uuid();
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("questions")
    .doc(questionId)
    .set({
      position: 1,
      question: data.question,
      type: data.type,
      options: data.options.map((item, index) => {
        return {
          name: item.name,
          isCorrect:
            data.type === "multiple"
              ? item.isCorrect === true
              : data.options.isCorrect === index,
        };
      }),
    })
    .then(() => {
      return {
        id: questionId,
      };
    });
};

export const getRunner = (pathwayId, runnerId, resolve, reject) => {
  firestoreClient
    .collection("runners")
    .doc(runnerId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        resolve({
          id: runnerId,
          pathwayId: pathwayId,
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

export const getRunners = (pathwayId, resolve, reject) => {
  return firestoreClient
    .collection("runners")
    .where("pathwayId", "==", pathwayId)
    .orderBy("level")
    .get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          ...data,
        });
      });
      if (resolve) resolve({ list });
      return list;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      if (reject) reject();
    });
};

export const deleteRunner = (runnerId) => {
  return firestoreClient.collection("runners").doc(runnerId).delete();
};
