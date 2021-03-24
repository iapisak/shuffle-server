const express = require('express')
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node')

const credentials = {
    clientId: process.env.ID,
    clientSecret: process.env.SECRET,
    redirectUri: process.env.URI
  }

router.post('/login', (req, res) => {
    const authorizeCode = req.body.authorizeCode
    const spotifyApi = new SpotifyWebApi(credentials)

    spotifyApi.authorizationCodeGrant(authorizeCode)
              .then(data => res.json({
                    accessToken: data.body.access_token,
                    refreshToken: data.body.refresh_token,
                    expiresIn: data.body.expires_in }))
              .catch((err)=> res.json({ status: 400, data: err }))
})

router.post('/refresh', (req, res) => {
    const spotifyApi = new SpotifyWebApi(credentials)
    spotifyApi.setRefreshToken(req.body.refreshToken)

    spotifyApi.refreshAccessToken()
              .then(data => res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in}))
              .catch((err)=> res.json({ status: 400, data: err }))
})

module.exports = router