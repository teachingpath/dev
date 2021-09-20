import "firebase/firestore";
import * as firebaseAdmin from "firebase-admin";
import serviceAccount from "config/firebase-service-account.json";
import FIREBASE from "config/firebase.config";

const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const Mustache = require("mustache");

const mailersend = new MailerSend({
  api_key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWJiY2RlYjcwY2ZhODYwYzMzMmE5ZmY1NTk4Y2MyZTA4M2JiYWQyOTRhODA3ZDBiMGQwMzIyYzhhMTM0MDk4OWMyODc1NGI2ZmVhYjBjZTkiLCJpYXQiOjE2MzE2MzQxNTQuMjcwMzk0LCJuYmYiOjE2MzE2MzQxNTQuMjcwMzk4LCJleHAiOjQ3ODczMDc3NTQuMjAzODY0LCJzdWIiOiIxMjM1NSIsInNjb3BlcyI6WyJlbWFpbF9mdWxsIiwiZG9tYWluc19mdWxsIiwiYWN0aXZpdHlfZnVsbCIsImFuYWx5dGljc19mdWxsIiwidG9rZW5zX2Z1bGwiLCJ3ZWJob29rc19mdWxsIiwidGVtcGxhdGVzX2Z1bGwiLCJzdXBwcmVzc2lvbnNfZnVsbCJdfQ.R4zZuu9ROy07r5v01DoMODH1dZB1lzRxlmtCDrN6hwO4pCf84_5rXkcKV4ELgNm7b_MSaZnYvQye-O7EGAXKKSBI2TyfLvAyussy--ZH8afBpu4TkqBFS-wWa7xLXXDY4tAtM1gz-jfLfDZ5b9HQLP8kkVkiuYy5a5yaaYOaRlbVS7cqg1Urdh-V8Hqm51IQ69j2xqxib49MncFMOFJEVRnP8wT_vF6jQ9IxFdq8Ss5XJG6xNB734dVwhqJoCjDva-y0JuQYeNbxsnO9fJWna2TrM41n1dXiLkoqccFI3RbAJ_XqKekYR3qsShDOIdBZ9IZ7jdwBGY7IWn35PJDwmToAdPk4KgVJ6L9xUqMHnr4DAvQtQ-yRFbPNXq9f2md7XeQXFGDEwxMg2DpXlC33GTJ01-aq4XVS7YUur2DG-5Zv7UUaRhDkAGE2kCGeMU3kYEgrrreJPpX70yr-F0t7jlK1KeBTmV-ZuGhO4pZ72_mcBW9EIHv90wjvhOCzsCejI3Mv0TVFdT7I6GlTxYC0AnNMx3IfcQ7dJ-8Ltg0A754RLwrZu2IyYbB_o6XtMJ48LvdbP0g6mNhVWokcNp02_b3midg3bPaMsK7hKBv8yZYBw4sLegGgfxWGGwT1tnRnsODc6Sc4rbt7i2Oh5dgzMYBOCHewEyeMHmDDX0e-3qw",
});

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
      getUsersWithJourney(req.query.pathwayId, async (users) => {
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
              
              const recipients = [
                new Recipient(user.email, user.displayName)
              ];
              const emailParams = new EmailParams()
                .setFrom("assistant@teachingpath.info")
                .setFromName("Teaching Path 🎓 <assistant@teachingpath.info>")
                .setRecipients(recipients)
                .setSubject("Tu Status en Teaching Path")
                .setHtml(output);

              return mailersend.send(emailParams);
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
