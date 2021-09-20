import "firebase/firestore";
import * as firebaseAdmin from "firebase-admin";
import serviceAccount from "config/firebase-service-account.json";
import FIREBASE from "config/firebase.config";
import { groupBy } from "components/helpers/array";

const Mustache = require("mustache");

if (!firebaseAdmin.apps.length) {
  // Initialize firebase admin
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: FIREBASE.databaseURL,
  });
}

const template = `<div>
<h1>Hola {{displayName}}</h1>
<h2>Estado actual de tu avance en Teaching Path</h2>
<p>Aquí puedes ver el avance de tu tablero de seguimiento en Teaching Path que llevas actualmente para el PATHWAY.</p>
<center>
<h3>{{pathwayName}}</h3>
<table width="300">
  <tr>
    <th>Runners</th>
    <td>{{runnersComplente}} / {{runnersTotal}}</td>
  </tr>
  <tr>
    <th>Tracks</th>
    <td>{{tracksComplete}} / {{tracksTotal}}</td>
  </tr>
  <tr>
    <th>Badges</th>
    <td>{{badgesComplete}} / {{badgesTotal}}</td>
  </tr>

</table>
</center>
<h3>Reporte de actividades</h3>
{{&reportList}}
<h3>¡Te animo a que sigas adelante! 💪 </h3>
<p>Puedes alcanzar tus metas y conseguir mas logros en la medida que completes los tracks de aprendizaje</p>
</div>`;

async function resumenHandler(req, res) {
  if (req.method === "GET") {
    try {
      getUserWithJourney(req.query.pathwayId,  req.query.userId, async (user) => {

          const data = await getStatsByUser(user, req.query.pathwayId);
          const reportList = data.completeTracks
            .sort((a, b) =>  a.runnerLevel - b.runnerLevel)
            .map((item) => {
                const resp =  item.response;
             
                return {
                  runnerName: item.runnerName,
                  name: item.name,
                  type: item.type,
                  responses: resp,
                }  
            });
          
           const runnerGroup =  groupBy(reportList, 'runnerName');
           console.log(runnerGroup);
          const output = Mustache.render(template, {
            pathwayName: data.pathwayName,
            displayName: user.displayName,
            runnersComplente: data.completeRunners.length,
            runnersTotal: data.completeRunners.length + data.incompleteRunners.length,
            tracksComplete: data.completeTracks.length,
            tracksTotal:  data.completeTracks.length + data.incompleteTracks.length,
            badgesComplete: data.completeBadges.length,
            badgesTotal:  data.completeBadges.length + data.incompleteBadges.length,
            reportList: "",
          });
          res.status(200).json(runnerGroup);
        },
        () => {
          res.status(500).send("ERROR");
        }
      );
    } catch (err) {
      console.log(err);
      res.status(403).send(err.message);
    }
  }
}

const getUserWithJourney = (pathwayId, userId, resolve, reject) => {
  const firestoreClient = firebaseAdmin.firestore();
  firestoreClient
    .collection("journeys")
    .where("pathwayId", "==", pathwayId)
    .where("userId", "==", userId)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const result = [];
        const doc = querySnapshot.docs[0];
        const journey = doc.data();
        resolve({ ...journey.user, userId: journey.userId });
      } else {
        reject();
      }
    })
    .catch((error) => {
      console.log(error);
      reject();
    });
};

const getStatsByUser = (user, pathwayId) => {
  const firestoreClient = firebaseAdmin.firestore();
  return firestoreClient
    .collection("journeys")
    .where("userId", "==", user.userId)
    .where("pathwayId", "==", pathwayId)
    .get()
    .then(async (querySnapshot) => {
      let badges = [];
      let pathwayName = "";
      const completeBadges = [];
      const incompleteBadges = [];
      const completeRunners = [];
      const incompleteRunners = [];
      const incompleteTracks = [];
      const completeTracks = [];
      const completeTrophes = [];

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];

        const journey = doc.data();
        pathwayName = journey.name;

        journey.breadcrumbs.forEach((breadcrumb, index) => {
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
          breadcrumb.tracks.forEach(async (t, ti) => {
            if (t.status === null) {
              const responses = await getTracksResponseByUserId(
                t.id,
                user.userId
              );
              const responseMapped = responses.list.map((item) => {
                const track = breadcrumb.tracks.filter(
                  (p) => p.id === item.trackId
                )[0];
                return {
                  response:
                    item.result ||
                    item.feedback ||
                    item.answer ||
                    item.solution,
                };
              });

              completeTracks.push({
                name: t.title,
                type: t.type,
                trackLevel: ti,
                runnerLevel: index,
                response: responseMapped,
                runnerName: breadcrumb.name,
              });
            } else {
              incompleteTracks.push({ name: t.title });
            }
          });
        });
        badges = await firestoreClient
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

        return {
          completeBadges: badges.completeBadges,
          incompleteBadges: badges.incompleteBadges,
          pathwayName,
          completeRunners,
          incompleteRunners,
          incompleteTracks,
          completeTracks,
          completeTrophes,
        };
      }
    });
};

export const getTracksResponseByUserId = (trackId, userId) => {
  const firestoreClient = firebaseAdmin.firestore();
  return firestoreClient
    .collection("track-response")
    .where("trackId", "==", trackId)
    .where("userId", "==", userId)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        return { list };
      } else {
        return { list: [] };
      }
    });
};

export default resumenHandler;
