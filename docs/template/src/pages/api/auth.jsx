import { firebaseAdmin } from "components/firebase/firebaseAdmin"

async function authenticatedHandler(req, res) {
  if (req.method === "POST") {
    // Try to verify token with firebase admin
    try {
      const firebaseData = await firebaseAdmin.auth().verifyIdToken(req.body.token)

      // Return firebase data
      res.status(200).json(firebaseData)
    } catch (err) {
      res.status(401).send("Invalid authentication")
    }
  }
}

export default authenticatedHandler
