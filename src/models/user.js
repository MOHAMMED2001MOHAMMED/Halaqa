const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
    firstName : {
        type : String ,
        required : [true ,'Please enter first name']
    },
    lastName : {
        type : String ,
        required : [true ,'Please enter last name']
    },
    phoneNumber :{
        type : String ,
        required : [true , 'Please enter number phone'],
        unique : true
    },
    password : {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 6,
        select: false
    },
    role : {
        type : String , 
        enum : ['coordinator','teacher','parent','admin'],
        default : 'user'
    },
    token : {
        type : String
    },
    email : {
        type : String ,
        required : [true , 'Please enter email'],
        unique : true
    },
    isOk : {
        type : Boolean ,
        default : false
    }
})




User.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, salt);
  });


User.methods.getSignedJwtToken = async function () {
    const user = this;
  
    const token = jwt.sign({ _id: user._id.toString() },/*process.env.JWT_SECRET*/"00");
  
    user.token = token;
    await user.save({ validateBeforeSave: false });
  
    return token;
  };
  
  // Match user entered password to hashed password in database
  User.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };



module.exports = mongoose.model('user',User)