const mongoose = require('mongoose')


const student = new mongoose.Schema({
    firstName : {
        type : String ,
        required : [true ,'Please enter first name']
    },
    lastName : {
        type : String ,
        required : [true ,'Please enter last name']
    },
    dateBirth :{
        type : String ,
        required : [true , 'Please enter number phone']
    },
    gender : {
        type: String,
        required: [true, 'Please enter a password'],
        enum : ['male','female']
    },
    educationLevel:{
        type : String ,
        required : [true,'Please enter education level']
    },
    parent :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : [true,'Please enter parent']
    },
    teacher :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : [true,'Please enter teacher']

    },
    active : {
        type : Boolean ,
        default : true
    }
})

module.exports = mongoose.model('student',student)