const mongoose = require('mongoose')


const tasks = new mongoose.Schema({
    sura : {
        type : String ,
        required : [true ,'Please enter sura']
    },
    dueDate : {
        type : String ,
        required : [true ,'Please enter due date']
    },
    ayaRange :{
        type : String ,
        required : [true , 'Please enter aya range']
    },
    type : {
        type: String,
        required: [true, 'Please enter type'],
        enum : ['Memorization','Revision']
    },
    status : {
        type: String,
        default : "pending",
        enum : ['pending','completed']
    },
    comment : {
        type : String 
    },
    endTask : {
        type : String
    },
    hifzLevel : {
        type : String , 
        enum : ['Excellent ','Ok','Poor']
    },
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'student',
        required : [true , 'Please enter student']
    },
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    teacher : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})

module.exports = mongoose.model('tasks',tasks)