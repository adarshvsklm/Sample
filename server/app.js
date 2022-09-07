const express = require('express')
const app = express()

const mongoose = require("mongoose");
const db =mongoose.connection

const cors = require('cors')



app.use(cors())
app.use(express.json())

let userRouter = require('./Routes/user')
app.use('/',userRouter)



try {
    mongoose.connect('mongodb://localhost:27017/project')
    db.on('error',console.error.bind(console,'connection error'))
    db.once('open', function () {
        console.log('Connected successfully');
    })
}catch(err){
    console.log(err);
}


app.listen(8000,()=>{
    console.log('Server started on port 8000');
})