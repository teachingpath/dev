import "firebase/auth"
import firebaseClient from "firebase/app"
import FIREBASE from "config/firebase.config"

// Check whether firebase client has been initialized
if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  // Initialize firebase client
  firebaseClient.initializeApp(FIREBASE)
  firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.LOCAL)
}

export { firebaseClient }
