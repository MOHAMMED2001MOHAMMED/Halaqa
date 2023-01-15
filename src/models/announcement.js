const mongoose = require('mongoose')


const announcement = new mongoose.Schema({
    title : {
        type : String ,
        required : [true ,'Please enter title']
    },
    text :{
        type : String ,
        required : [true ,'Please enter text']
    },
    image : {
        type : [String]
    }
})

module.exports = mongoose.model('announcement',announcement)