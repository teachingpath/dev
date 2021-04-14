import firebaseClient from "firebase/app"

import "firebase/auth"
import "firebase/firestore"
import "firebase/firebase-storage"
import "firebase/analytics"

import FIREBASE from "config/firebase.config"

let firestoreClient = null;
let storageClient = null;
let analyticsClient = null;

// Check whether firebase client has been initialized
if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  // Initialize firebase client
  const app = firebaseClient.initializeApp(FIREBASE)
  firestoreClient = firebaseClient.firestore(app);
  storageClient = firebaseClient.storage();
  analyticsClient = firebaseClient.analytics();
  firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.LOCAL)
}


export { firebaseClient, firestoreClient, storageClient, analyticsClient}
