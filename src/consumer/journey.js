import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import {
  activityMapper,
  linkGroup,
  linkPathway,
  linkResume,
  linkRunner,
} from "components/helpers/mapper";
import { sendFinishPathway, sendFinishRunner } from "./sendemail";

export const getJourneyByPathwayId = (pathwayId, resolve, reject) => {
  firestoreClient
    .collection("journeys")
    .where("pathwayId", "==", pathwayId)
    .get()
    .then(async (querySnapshot) => {
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

export const getBadges = (journeyId, resolve, reject) => {
  firestoreClient
    .collection("journeys")
    .doc(journeyId)
    .collection("badge")
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

export const getStatsByUser = (resolve, reject) => {
  const user = firebaseClient.auth().currentUser;
  if (user) {
    firestoreClient
      .collection("journeys")
      .where("userId", "==", user.uid)
      .get()
      .then(async (querySnapshot) => {
        const completeBadges = [];
        const incompleteBadges = [];
        const completePathways = [];
        const incompletePathways = [];
        const completeRunners = [];
        const incompleteRunners = [];
        const incompleteTracks = [];
        const completeTracks = [];
        const completeTrophes = [];

        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            const journey = doc.data();

            if (journey.progress >= 100) {
              completePathways.push({ name: journey.name });
              completeTrophes.push({ name: journey.trophy.name });
            } else {
              incompletePathways.push({ name: journey.name });
            }

            journey.breadcrumbs.forEach((breadcrumb) => {
              const totalTime = breadcrumb.tracks
                ?.filter((t) => t.status !== null)
                ?.filter((t) => t.status !== "finish")
                ?.map((t) => t.timeLimit)
                .reduce((a, b) => a + b, 0);

              if (totalTime > 0) {
                incompleteRunners.push({ name: breadcrumb.name });
              } else {
                completeRunners.push({ name: breadcrumb.name });
              }
              breadcrumb.tracks.forEach((t) => {
                if (t.status === null) {
                  completeTracks.push({ name: t.title });
                } else {
                  incompleteTracks.push({ name: t.title });
                }
              });
            });
            const data = await firestoreClient
              .collection("journeys")
              .doc(doc.id)
              .collection("badge")
              .get()
              .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                  querySnapshot.forEach((doc) => {
                    const badge = doc.data();
                    if (badge.disabled) {
                      incompleteBadges.push({
                        name: badge.name,
                      });
                    } else {
                      completeBadges.push({
                        name: badge.name,
                      });
                    }
                  });
                }
                return {
                  incompleteBadges,
                  completeBadges,
                };
              });

            resolve({
              ...data,
              completePathways,
              incompletePathways,
              completeRunners,
              incompleteRunners,
              incompleteTracks,
              completeTracks,
              completeTrophes,
            });
          }); //end foreach
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        reject();
      });
  } else {
    reject();
  }
};

export const getBadgesByUser = (resolve, reject) => {
  const user = firebaseClient.auth().currentUser;
  if (user) {
    firestoreClient
      .collection("journeys")
      .where("userId", "==", user.uid)
      .get()
      .then(async (querySnapshot) => {
        const dataList = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            const result = await firestoreClient
              .collection("journeys")
              .doc(doc.id)
              .collection("badge")
              .where("disabled", "==", false)
              .get()
              .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                  querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data) {
                      dataList.push(data);
                    }
                  });
                }
                return dataList;
              });
            resolve({ data: result });
          });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        reject();
      });
  } else {
    reject();
  }
};

export const getTrophiesByUser = (resolve, reject) => {
  const user = firebaseClient.auth().currentUser;
  if (user) {
    firestoreClient
      .collection("journeys")
      .where("userId", "==", user.uid)
      .where("progress", ">=", 100)
      .get()
      .then((querySnapshot) => {
        const dataList = [];

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            dataList.push(doc.data().trophy);
          });
        }
        resolve({ data: dataList });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        reject();
      });
  } else {
    reject();
  }
};

export const enableBadge = (journeyId, runnerId, totalPoints) => {
  return firestoreClient
    .collection("journeys")
    .doc(journeyId)
    .collection("badge")
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

export const processFinish = (
  data,
  user,
  journeyId,
  currentRunner,
  totalPoints,
  activityChange
) => {
  if (data.progress >= 100) {
    //finish pathway
    sendFinishPathway(user.email, data.name);
    activityChange(
      activityMapper(
        "complete_pathway",
        linkPathway(data.pathwayId, data.name, "El Pathway __LINK__ está competado."),
        linkGroup(
          journeyId,
          user,
          linkPathway(
            data.id,
            data.name,
            "ha completado el pathway: __LINK__, su nuevo progreso es: 100%"
          )
        ),
        data.group,
        totalPoints
      )
    );
  } else {
    //finshi runner
    sendFinishRunner(user.email, currentRunner.name);
    activityChange(
      activityMapper(
        "complete_quiz",
        linkRunner(
          currentRunner.id,
          currentRunner.name,
          "La Ruta __LINK__ está competado."
        ),
        linkGroup(
          journeyId,
          user,
          linkRunner(
            currentRunner.id,
            currentRunner.name,
            "ha completado la ruta: __LINK__, su nuevo progreso es: " +
              data.progress.toFixed(2) +
              "%"
          )
        ),
        data.group,
        totalPoints
      )
    );
  }
};
export const processJourney = (data) => {
  let tracksCompleted = data.current + 1;
  let tracksTotal = data.breadcrumbs.length;
  data.breadcrumbs.forEach((runner) => {
    if (runner.tracks) {
      runner.tracks.forEach((track) => {
        tracksTotal++;
        if (track.status === "finish" || track.status === null) {
          tracksCompleted++;
        }
      });
    }
  });
  data.progress = (tracksCompleted / tracksTotal) * 100;

  const currentRunner = data.breadcrumbs[data.current];
  currentRunner.current = null;
  currentRunner.tracks.forEach((track) => {
    track.status = null;
  });
  data.current = data.current + 1;
  try {
    data.breadcrumbs[data.current].current = 0;
    data.breadcrumbs[data.current].tracks[0].status = "process";
  } catch (e) {
    console.log("There are no more runners, complete pathway");
  }
  return data;
};
