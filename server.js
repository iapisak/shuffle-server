const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT
const routes = require('./routes/api')
const corsOptions = {
    "Access-Control-Allow-Origin": ['http://localhost:3000', 'https://project-write-it.herokuapp.com'],
    "Access-Control-Allow-Headers": true,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/api/v1', routes)

app.listen(PORT, ()=> console.log(`Server Run on ${ PORT }`))