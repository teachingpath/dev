import absoluteUrl from "next-absolute-url"
import nookies from "nookies"
import fetch from "isomorphic-unfetch"

async function firebaseVerifyCookie(ctx) {
  // Get cookies
  const cookies = nookies.get(ctx)
  // Get absolute origin url
  const { origin } = absoluteUrl(ctx.req)

  // Try to verify firebase token via API
  return await fetch(origin + "/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: cookies.token })
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return false
    }
  })
}

export default firebaseVerifyCookie
