const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')

const router = require('./config/routes')

const app = express()
const port = 3012

// connect to mongo database
connectDB() 

//
app.use(cors())

// express to parse json
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log('listening on port', port)
})