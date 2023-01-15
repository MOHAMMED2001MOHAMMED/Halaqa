const User = require('../models/user')
const asyncHandler = require('../middleware/async') 



// @desc      get all the users
// @route     GET /api/v1/user
// @access    private coordinator
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
  });




// @desc      get user
// @route     GET /api/v1/user/:id
// @access    private coordinator
exports.getUser = asyncHandler(async (req, res, next) => {
   let user = await User.findById(req.params.id)
   res.status(200).json({  
    success : true ,
    data : user
})
  });