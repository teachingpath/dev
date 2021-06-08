import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import uuid from "components/helpers/uuid";

export const create = (pathwayId, data) => {
  const runnerId = uuid();
  const user = firebaseClient.auth().currentUser;
  const searchTypes = data.name.toLowerCase();
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .set({
      level: 1,
      leaderId: user.uid,
      pathwayId: pathwayId,
      date: new Date(),
      searchTypes,
      ...data,
    });
};

export const update = (runnerId, data) => {
  const searchTypes = data.name.toLowerCase();
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .update({
      ...data,
      searchTypes
    });
};

export const updateBadge = (runnerId, data) => {
  return firestoreClient
    .collection("runners")
    .doc(runnerId)
    .update({
      badget: {
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