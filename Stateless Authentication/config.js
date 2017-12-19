const dotenv = require("dotenv").config();

module.exports = {
    'port': `${process.env.PORT}` || 8000,
    'dbUrl': `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}@ds127506.mlab.com:27506/simple-todo-app`,
    'jwtSecret': `${process.env.JWT_SECRET}`
}