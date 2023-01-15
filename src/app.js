const express = require('express')
const connectDB = require('./db/mongoose')
const app = express()
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const cors = require('cors')
const auth = require('./routes/auth')
const user = require('./routes/user')
const student = require('./routes/student')
const tasks = require('./routes/tasks')
const announcement = require('./routes/announcement')

app.use(express.json()); 

app.use(cookieParser());

connectDB()


//app.use(cors()) 

app.use('/api/v1/auth',auth)
app.use('/api/v1/user',user)
app.use('/api/v1/student',student)
app.use('/api/v1/tasks',tasks)
app.use('/api/v1/announcement',announcement)


app.use(errorHandler);




app.listen(process.env.PORT || 3000,()=>{
    console.log('http://localhost:4000'); 
})
