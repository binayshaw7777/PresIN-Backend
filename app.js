require('dotenv').config
const express = require('express')
const connectDB = require('./config/db')
const app = express()
const PORT = process.env.PORT || 3000
const userRoutes = require('./routes/userRoute')
const attendanceRoutes = require('./routes/attendanceRoute')

app.get('/', (req,res) => {
    res.send("Homepage")
})

app.use(express.json)

app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);

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