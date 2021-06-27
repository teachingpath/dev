import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";

export const loadQuiz = (runnerId, journeyId, resolve, reject) => {
  firestoreClient
    .collection("runners")
    .doc(runnerId)
    .collection("questions")
    .get()
    .then((querySnapshot) => {
      const questions = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const type = data.type;
        let correctAnswer = null;
        const answers = data.options.map((opt) => {
          return opt.name;
        });
        data.options.forEach((opt, index) => {
          if (type === "single" && opt.isCorrect === true) {
            correctAnswer = index + 1 + "";
            return;
          }
          if (type === "multiple" && opt.isCorrect === true) {
            if (correctAnswer === null) {
              correctAnswer = [];
            }
            correctAnswer.push(index + 1);
          }
        });
        questions.push({
          question: data.question,
          questionType: "text",
          answerSelectionType: type,
          answers: answers,
          correctAnswer: correctAnswer,
          point: "2",
        });
      });

      return firestoreClient
        .collection("journeys")
        .doc(journeyId)
        .get()
        .then((doc) => {
          const data = doc.data();
          if (data.progress >= 100) {
            reject();
          } else {
            resolve({
              questions: questions,
              trophy: data.trophy,
            });
          }
        });
    });
};
