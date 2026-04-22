require("dotenv").config()
const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(cors({ origin: process.env.FRONTEND_URL }))

// Step 1 - Redirect user to GitHub
app.get("/auth/github", (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`
  res.redirect(url)
})

// Step 2 - GitHub redirects back here with a code
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

console.log("Final JWT:", jwt)
    // Send JWT back to React app
    res.redirect(`${process.env.FRONTEND_URL}/oauth/callback?token=${jwt}`)

  } catch (err) {
    console.error(err)
    res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`)
  }
})

app.listen(3001, () => console.log("Auth server running on port 3001"))