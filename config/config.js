require('dotenv').config()

module.exports = {
    development: {
        host: process.env.HOST,
        port: process.env.PORT
    }
}