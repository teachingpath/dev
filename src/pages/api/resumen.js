import "firebase/firestore";
import * as firebaseAdmin from "firebase-admin";
import serviceAccount from "config/firebase-service-account.json";
import FIREBASE from "config/firebase.config";
const sgMail = require("@sendgrid/mail");
const Mustache = require("mustache");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
      getUsersWithJourney(
        req.query.pathwayId,
        async (users) => {
          const result = Object.keys(users).map(async (key) => {
            const user = users[key];
            const data = await getStatsByUser(user, req.query.pathwayId);
            if (data) {
              const output = Mustache.render(template, {
                pathwayName: data.pathwayName,
                displayName: user.displayName,
                runnersComplente: data.completeRunners.length,
                runnersTotal: data.completeRunners.length + data.incompleteRunners.length,
                tracksComplete: data.completeTracks.length,
                tracksTotal: data.completeTracks.length + data.incompleteTracks.length,
                badgesComplete: data.completeBadges.length,
                badgesTotal: data.completeBadges.length + data.incompleteBadges.length,
                reportList: data.completeTracks.sort((a, b) => {
                  return a.runnerLevel - b.runnerLevel
                }).map((item) => {
                   const resp = item.response.map((it) => {
                    return "<li>"+it.response+" </li>";
                  }).join("") || "<li>-- Sin reporte --</li>";
                  return "<h4>["+item.runnerName+"] "+item.name+" - "+item.type+"</h4><ul>"+resp+"</ul>";
                }).join("")

              });
              const response = {
                to: user.email,
                from: "Teaching Path 🎓 <assistant@teachingpath.info>",
                subject: "Tu Status en Teaching Path",
                html: output,
              };
              const res = await sgMail.send(response);
              return res;
            }

            return null;
          });

          Promise.all(result).then((values) => {
            res.status(200).json(values);
          });
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

const getUsersWithJourney = (pathwayId, resolve, reject) => {
  const firestoreClient = firebaseAdmin.firestore();
  firestoreClient
    .collection("journeys")
    .where("pathwayId", "==", pathwayId)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const result = [];

        querySnapshot.forEach((doc) => {
          const journey = doc.data();
          result[journey.userId] = { ...journey.user, userId: journey.userId };
        });
        resolve(result);
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
              const responses = await getTracksResponseByUserId(t.id, user.userId);
              const responseMapped = responses.list.map(item => {
                const track = breadcrumb.tracks.filter(p => p.id === item.trackId)[0];
                return {
                  type:  track.type,
                  response: item.result || item.feedback || item.answer || item.solution
                }
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
