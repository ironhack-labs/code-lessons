const expressSession = require("express-session")
const connectMongo = require("connect-mongo")
const mogoose = require("mongoose")

const MongoStore = connectMongo(expressSession)

const session = expressSession({
    secret: process.env.SESSION_SECRET || 'super secret (change it)',
    saveUninitialized: false,
    cookie: {
        secure: process.env.SESSION_SECURE || false,
        httpOnly: true,
        maxAge: process.envSESSION_MAX_AGE || 2000
    },
    store: new MongoStore({
        mongooseConnection: mogoose.connection,
        ttl: process.envSESSION_MAX_AGE || 200
    })
})

module.exports = session