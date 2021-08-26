import * as firebaseAdmin from "firebase-admin"
import serviceAccount from "config/firebase-service-account.json"
import FIREBASE from "config/firebase.config"

if (!firebaseAdmin.apps.length) {
  // Initialize firebase admin
   firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: FIREBASE.databaseURL
  })
}

export { firebaseAdmin }
