const express = require('express')
const router = express.Router()
const spotifyApi = require('spotify-web-api-node')

router.post('/login', (req, res) => {
    console.log(req.body)
})

module.exports = router