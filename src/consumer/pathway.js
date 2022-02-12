import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { createSlug } from "components/helpers/mapper";
import uuid from "components/helpers/uuid";
import { getRunners, create as createRunner, deleteRunner } from "./runner";
import { getTracks } from "./track";

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
      longDescription: data.longDescription,
      description: data.description,
      image: data.image,
      level: data.level,
      isFollowUp: false,
      name: data.name,
      slug: createSlug(data.name),
      searchTypes: searchTypes,
      tags: tags,
      draft: true,
      groups: [
        {
          name: "default",
          slug: "default",
          isPrivate: false,
          id: 1,
        },
      ],
      leaderId: user.uid,
      contributors: [user.uid],
      date: new Date(),
    })
    .then(async () => {
      if (data.runners) {
        let level = 0;
        Object.keys(data.runners || {}).forEach(async (key) => {
          await createRunner(pathwayId, {
            name: data.runners[key].name,
            level: level++,
          });
        });
      }
    })
    .then(() => {
      return {
        id: pathwayId,
      };
    });
};

export const deletePathway = (pathwayId) => {
  return firestoreClient
    .collection("pathways")
    .doc(pathwayId)
    .delete()
    .then(() => {
      return firestoreClient
        .collection("runners")
        .where("pathwayId", "==", pathwayId)
        .get()
        .then(function (querySnapshot) {
          return querySnapshot.map(function (doc) {
            deleteRunner(doc.id);
          });
        });
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

export const updateFollowUp = (id, isFollowUp) => {
  const dataUpdated = {
    isFollowUp: isFollowUp,
    date: new Date(),
  };
  return firestoreClient.collection("pathways").doc(id).update(dataUpdated);
};

export const update = (id, data) => {
  const tags = data.tags.split(",").map((item) => {
    return item.trim().toLowerCase();
  });
  const searchTypes = data.name.toLowerCase() + " " + data.tags.toLowerCase();
  const dataUpdated = {
    ...data,
    draft: true,
    longDescription: data.longDescription,
    level: data.level,
    name: data.name,
    slug: createSlug(data.name),
    tags: tags,
    searchTypes: searchTypes,
    date: new Date(),
  };
  return firestoreClient
    .collection("pathways")
    .doc(id)
    .update(dataUpdated)
    .then(async () => {
      if (data.runners) {
        let level = 0;
        Object.keys(data.runners).forEach(async (key) => {
          await createRunner(pathwayId, {
            name: data.runners[key].name,
            level: level++,
          });
        });
      }
    })
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

export const updateGroup = (pathwayId, data) => {
  const searchRegExp = /\s/g;
  const replaceWith = "-";
  return firestoreClient
    .collection("pathways")
    .doc(pathwayId)
    .update({
      groups: data.map((item) => ({
        name: item?.name,
        slug: item?.name.toLowerCase().replace(searchRegExp, replaceWith),
        isPrivate: item?.isPrivate === true,
        id: item?.id,
      })),
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

export const getMyPathways = (resolve, reject) => {
  const user = firebaseClient.auth().currentUser;

  firestoreClient
    .collection("pathways")
    .where("leaderId", "==", user?.uid)
    .orderBy("date", "desc")
    .get()
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

export const publishPathway = (pathwayId, resolve, reject) => {
  firestoreClient
    .collection("pathways")
    .doc(pathwayId)
    .get()
    .then( (doc) => {
      return publishPathwayFor(doc, pathwayId, resolve, reject);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

export const unpublushPathway = (pathwayId) => {
  return firestoreClient.collection("pathways").doc(pathwayId).update({
    draft: true,
  });
};

export const pathwayFollowUp = (userId, resolve, reject) => {
  firestoreClient
    .collection("pathways")
    .where("leaderId", "==", userId)
    .where("isFollowUp", "==", true)
    .get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.id);
      });
      return firestoreClient
        .collection("journeys")
        .where("pathwayId", "in", list)
        .orderBy("date", "desc")
        .get()
        .then((querySnapshot) => {
          const finisheds = [];
          const inRunning = [];
          querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            data.id = doc.id;
            data.groupName = data.group.replace(
              createSlug(data.name) + "-",
              ""
            );
            if (data.progress >= 100) {
              finisheds.push(data);
            } else {
              inRunning.push(data);
            }
          });
          return { finisheds, inRunning };
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    })
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

async function publishPathwayFor(doc, pathwayId, resolve, reject) {
  console.log("publish pathway for =>"+pathwayId);
  if (doc.exists) {
    const data = doc.data();

    if (!Object.keys(data.trophy || {}).length) {
      reject("El PATHWAY requiere un trofeo para publicarlo");
      return;
    }

    const runners = await getRunners(pathwayId);
    for (const key in runners) {
      const tracks = await getTracks(runners[key].id);
      if (tracks.length < 2) {
        reject(
          'La RUTA "' +
            runners[key].name +
            '" requiere un mínimo de 2 lecciones para publicar.'
        );
        return;
      }
    }
    onPublish(pathwayId, data, resolve);
  } else {
    console.log("No such document!");
  }
}

function onPublish(pathwayId, data, resolve) {
  firestoreClient
    .collection("pathways")
    .doc(pathwayId)
    .update({ draft: false })
    .then(() => {
      resolve(data);
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}
