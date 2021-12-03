import firebaseClient from 'firebase/compat/app';

import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import "firebase/compat/analytics"

import FIREBASE from "config/firebase.config"

let firestoreClient = null;
let storageClient = null;
let analyticsClient = null;
const app = firebaseClient.initializeApp(FIREBASE)
firestoreClient = firebaseClient.firestore(app);

// Check whether firebase client has been initialized
if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  // Initialize firebase client
  storageClient = firebaseClient.storage();
  analyticsClient = firebaseClient.analytics.isSupported() ? firebaseClient.analytics() : null;
  firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.LOCAL);
}




export { firebaseClient, firestoreClient, storageClient, analyticsClient}
