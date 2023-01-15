const mongoose = require('mongoose')


const halaqa = new mongoose.Schema({
    name : {
        type : String ,
        required : [true ,'Please enter first name']
    },
    teacher :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})

module.exports = mongoose.model('halaqa',halaqa)