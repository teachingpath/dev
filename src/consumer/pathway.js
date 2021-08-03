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
      description: data.description,
      image: data.image,
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
      if(data.runners){
        let level = 0;
        Object.keys(data.runners || {}).forEach(async (key) => {
          await createRunner(pathwayId, {
              name: data.runners[key].name,
              level: level++
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
        .get().then(function(querySnapshot) {
          return querySnapshot.map(function(doc) {
            deleteRunner(doc.id);
          });
        });
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
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
      if(data.runners){
        let level = 0;
        Object.keys(data.runners).forEach(async (key) => {
          await createRunner(pathwayId, {
              name: data.runners[key].name,
              level: level++
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
    .where("leaderId", "==", user.uid)
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
    .then(async (doc) => {
      await publishPathwayFor(doc, pathwayId, resolve, reject);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

export const unpublushPathway = (pathwayId) => {
  return firestoreClient
    .collection("pathways")
    .doc(pathwayId)
    .update({
      draft: true,
    });
};

async function publishPathwayFor(doc, pathwayId, resolve, reject) {
  if (doc.exists) {
    const data = doc.data();

    if (!Object.keys(data.trophy || {}).length) {
      reject("The pathway requires a trophy to publish it.");
      return;
    }

    const runners = await getRunners(pathwayId);
    for (const key in runners) {
      if (!Object.keys(runners[key].badge || {}).length) {
        console.log(runners[key]);
        reject(
          'The runner "' +
            runners[key].name +
            '" requires a badge to publish this pathway.'
        );
        return;
      }

      const tracks = await getTracks(runners[key].id);
      if (tracks.length < 2) {
        reject(
          'The runner "' +
            runners[key].name +
            '" requires a minimum of 3 tracks to be able to publish the pathway.'
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
