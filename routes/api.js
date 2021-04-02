const express = require('express')
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node')
const LyricFinder = require('lyrics-finder')

const credentials = {
    clientId: 'e244682973e24a3caa0b3a29bb72f95a',
    clientSecret: '98dba1cc2b28414ca854c3cdb7cd4c7f',
    redirectUri: 'http://localhost:3000'
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

router.get('/lyric/:artist/:title', async (req, res)=> {
    const { artist, title } = req.params
    const lyric = await LyricFinder(artist, title) || 'not found'
    res.json({ lyric })
})

module.exports = router