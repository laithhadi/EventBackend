require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || process.env.LOCAL_PORT
const router = require("./router")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")

//DATABASE CONNECTION
require('./Config/DBConnection')

app.use(cors())
app.use(helmet({ contentSecurityPolicy: false }))
app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes that will ignore the auth header
const unprotectedRoutes = [
    '/login',
    '/register'
];

// Auth middleware
app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (
        unprotectedRoutes.includes(req.url)
        || authHeader === process.env.AUTH_SECRET
    ) {
        next();
    } else {
        res.sendStatus(403);
    }
});

app.use(router)

app.listen(port, () => {
    console.log(`My app is listening on localhost:${port}`)
})