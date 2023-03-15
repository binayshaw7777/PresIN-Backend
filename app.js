require('dotenv').config
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send("Homepage")
})

app.use(express.json)

const start = async() => {
    try{
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () =>{
            console.log(`Server is up and listening on port ${PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}

start();
