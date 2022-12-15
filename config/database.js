require('dotenv').config()

module.exports = {
    development : {
        username : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        dialect : process.env.DB_DIALECT,
        host : process.env.DB_HOST,
        port : process.env.DB_PORT
    },
    test: {
        username : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        dialect : process.env.DB_DIALECT,
        host : process.env.DB_HOST,
        port : process.env.DB_PORT
    },
    production: {
        username : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        dialect : process.env.DB_DIALECT,
        host : process.env.DB_HOST,
        port : process.env.DB_PORT
    }
}