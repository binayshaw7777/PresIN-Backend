const mongoose = require('mongoose')
require('dotenv').config()


const connectDB = async (uri) => {
    console.log("Connected to DB")
    mongoose.set("strictQuery", false)
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB