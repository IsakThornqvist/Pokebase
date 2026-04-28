/**
 * OAuth authentication server.
 *
 * Handles GitHub OAuth 2.0 flow server-side to keep
 * the client secret secure. Maps GitHub identity to
 * an existing API user via login or auto-registration,
 * then returns a JWT to the frontend.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

require("dotenv").config()
const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(cors({ origin: process.env.FRONTEND_URL }))

/**
 * Step 1 — Redirect user to GitHub OAuth consent screen.
 *
 * Builds the GitHub authorization URL with the client ID
 * and required scopes, then redirects the user.
 */
app.get("/auth/github", (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`
  res.redirect(url)
})

/**
 * Step 2 — Handle GitHub OAuth callback.
 *
 * Receives the authorization code from GitHub, exchanges
 * it for an access token, fetches the user's primary email,
 * then maps the identity to an API user via login or register.
 * Redirects to the frontend with the JWT token on success.
 */
app.get("/auth/github/callback", async (req, res) => {
  const { code } = req.query

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    )

    const accessToken = tokenResponse.data.access_token

    // Use access token to get user's email from GitHub
    const emailResponse = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const primaryEmail = emailResponse.data.find(e => e.primary)?.email

    if (!primaryEmail) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_email`)
    }

    // Try to login first, if that fails register
    let jwt = null

try {
  // Attempt to log in with the GitHub email and shared OAuth secret
  const loginResponse = await axios.post(process.env.API_URL, {
    query: `
      mutation {
        login(email: "${primaryEmail}", password: "${process.env.OAUTH_SECRET}") {
          token
        }
      }
    `
  })

  const loginData = loginResponse.data
  console.log("Login response:", JSON.stringify(loginData))
  
  if (loginData.errors) throw new Error("Login failed")
  jwt = loginData.data.login.token
  console.log("JWT set:", jwt)

} catch (err) {
  console.log("Login failed, trying register...", err.message)
  
  const registerResponse = await axios.post(process.env.API_URL, {
    query: `
      mutation {
        register(email: "${primaryEmail}", password: "${process.env.OAUTH_SECRET}") {
          token
        }
      }
    `
  })
  console.log("Register response:", JSON.stringify(registerResponse.data))
  jwt = registerResponse.data.data.register.token
}

    // Redirect to frontend with JWT as query parameter
    res.redirect(`${process.env.FRONTEND_URL}/oauth/callback?token=${jwt}`)

  } catch (err) {
    console.error(err)
    res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`)
  }
})

app.listen(3001, () => console.log("Auth server running on port 3001"))