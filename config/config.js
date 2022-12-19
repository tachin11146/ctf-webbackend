require('dotenv').config()

module.exports = {
    development: {
        host: process.env.HOST,
        port: process.env.PORT,
        secret: process.env.SECRET_KEY,
        keyExpire: "1d"
    }
}