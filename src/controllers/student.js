const student = require('../models/student')
const asyncHandler = require('../middleware/async') 



// @desc      add student
// @route     post /api/v1/student
// @access    private coordinator
exports.addStudent = asyncHandler(async (req, res, next) => {
    let Student = new student(req.body)
        await Student.save()
    res.status(200).json({
        success : true , 
        data : Student
    });
});




// @desc      get all the students
// @route     GET /api/v1/student
// @access    private coordinator
exports.getAllStudent = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
  });



// @desc      get  student
// @route     GET /api/v1/student/:id
// @access    private teacher and coordinator and parent
exports.getStudent = asyncHandler(async (req, res, next) => {
        let Student = await student.findById(req.params.id)
        res.status(200).json({
            success : true , 
            data : Student
            })
});





// @desc      get  student
// @route     GET /api/v1/student/studentsMe
// @access    private teacher and parent
exports.getStudentsMe = asyncHandler(async (req, res, next) => {
    let id = req.user.id
    console.log(id)
     let Student = await student.find({$or:[{teacher:id},{parent:id}]})
    res.status(200).json({
        success : true , 
        data : Student
        })
});





// @desc      put  student
// @route     put /api/v1/student
// @access    private coordinator
exports.updateStudent = asyncHandler(async (req, res, next) => {
    let id = req.params.id
    let Student = await student.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({
        success : true , 
        data : Student
        })
});




// @desc      delete  student
// @route     delete /api/v1/student
// @access    private coordinator
exports.deleteStudent = asyncHandler(async (req, res, next) => {
    let id = req.params.id
    let Student = await student.findByIdAndDelete(id)
    res.status(200).json({
        success : true , 
        data : Student
        })
});