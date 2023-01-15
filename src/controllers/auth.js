const User = require('../models/user')
const asyncHandler = require('../middleware/async') 
const ErrorResponse = require('../utils/error-response');
const bcrypt = require('bcryptjs');


// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {

      let user = new User(req.body);
        await user.save()
      
      sendTokenResponse(user, 200, res);
  });






// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { phoneNumber, password } = req.body;
  
    // Validate emil & password
    if (!phoneNumber || !password) {
      return next(new ErrorResponse('Please provide an phone number and password', 400));
    }
  
    // Check for user
    const user = await User.findOne({ phoneNumber }).select('+password');
      console.log(user);
    if (!user) {
      return next(new ErrorResponse('Invalid phone number or Password', 401));
    }
  
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    sendTokenResponse(user, 200, res);
  });




  const sendTokenResponse = async (user, statusCode, res) => {
    // Create token
    const token = await user.getSignedJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    
  
    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token,
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName : user.lastName,
          email : user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      });
  };