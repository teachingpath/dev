import "firebase/firestore";
import * as firebaseAdmin from "firebase-admin";
import serviceAccount from "config/firebase-service-account.json";
import FIREBASE from "config/firebase.config";
const sgMail = require("@sendgrid/mail");
const Mustache = require("mustache");

sgMail.setApiKey(
  process.env.SENDGRID_API_KEY ||
    "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"
);

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
<p>Aquí puedes ver el avance de tu tablero de seguimiento en Teaching Path que llevas actualmente.</p>
<center>
<table width="300">
  <tr>
    <th>Pathways</th>
    <td>{{pathwaysComplete}} / {{pathwaysTotal}}</td>
  </tr>
  <tr>
    <th>Runners</th>
    <td>{{runnersComplente}} / {{runnersTotal}}</td>
  </tr>
  <tr>
    <th>Tracks</th>
    <td>{{tracksComplete}} / {{tracksTotal}}</td>
  </tr>
  <tr>
    <th>Trophies</th>
    <td>{{trophiesComplete}} / {{trophiesTotal}}</td>
  </tr>
  <tr>
    <th>Badges</th>
    <td>{{badgesComplete}} / {{badgesTotal}}</td>
  </tr>

</table>
</center>
<h3>¡Te animo a que sigas adelante! 💪 </h3>
<p>Puedes alcanzar tus metas y conseguir mas logros en la medida que completes los tracks de aprendizaje</p>
</div>`;

async function resumenHandler(req, res) {
  if (req.method === "GET") {
    try {
      getUsersWithJourney(
        async (users) => {
          const result = [];
          Object.keys(users).forEach(async (key) => {
            const user = users[key];
            const data = await getStatsByUser(user);
            if (data) {
              const output = Mustache.render(template, {
                displayName: user.displayName,
                pathwaysComplete: data.completeBadges.length,
                pathwaysTotal:
                  data.completeBadges.length + data.incompleteBadges.length,
                runnersComplente: data.completeRunners.length,
                runnersTotal:
                  data.completeRunners.length + data.incompleteRunners.length,
                tracksComplete: data.completeTracks.length,
                tracksTotal:
                  data.completeTracks.length + data.incompleteTracks.length,
                trophiesComplete: data.completePathways.length,
                trophiesTotal:
                  data.completeTrophes.length + data.completePathways.length,
                badgesComplete: data.completeBadges.length,
                badgesTotal:
                  data.completeBadges.length + data.incompleteBadges.length,
              });

              const res = await sgMail.send({
                to: user.email,
                from: "Teaching Path 🎓 <assistant@teachingpath.info>",
                subject: "Tu Status en Teaching Path",
                html: output,
              });
              result.push(res);
            }
          });

          res.status(200).json(result);
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

const getUsersWithJourney = (resolve, reject) => {
  const firestoreClient = firebaseAdmin.firestore();
  firestoreClient
    .collection("journeys")
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

const getStatsByUser = (user) => {
  const firestoreClient = firebaseAdmin.firestore();
  return firestoreClient
    .collection("journeys")
    .where("userId", "==", user.userId)
    .get()
    .then(async (querySnapshot) => {
      let badges = [];
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
        }); //end foreach

        return {
          completeBadges,
          incompleteBadges,
          completePathways,
          incompletePathways,
          completeRunners,
          incompleteRunners,
          incompleteTracks,
          completeTracks,
          completeTrophes,
        };
      }
    });
};

export default resumenHandler;
