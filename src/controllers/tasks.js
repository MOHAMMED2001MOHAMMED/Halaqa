const tasks = require('../models/tasks')
const student = require('../models/student')
const asyncHandler = require('../middleware/async') 



// @desc      add task
// @route     post /api/v1/tasks
// @access    private teacher
exports.addTask = asyncHandler(async (req, res, next) => {
    let body = req.body
    let Student = await student.findById(body.student)
        body.parent = Student.parent
        body.teacher = req.user.id
    let task = new tasks(body)
        await task.save()
    res.status(200).json({
        success : true , 
        data : body
    });
});




// @desc      get all the tasks
// @route     GET /api/v1/task
// @access    private coordinator
exports.getAllTasks = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
  });



// @desc      get  task
// @route     GET /api/v1/task/:id
// @access    private teacher and coordinator and parent
exports.getTask = asyncHandler(async (req, res, next) => {
        let task = await tasks.findById(req.params.id)
        res.status(200).json({
            success : true , 
            data : task
            })
});





// @desc      get  task me
// @route     GET /api/v1/task/tasksMe
// @access    private teacher and parent
exports.getTasksMe = asyncHandler(async (req, res, next) => {
    let id = req.user.id
    let task = await tasks.find({$or:[{teacher:id},{parent:id}]})
    res.status(200).json({
        success : true , 
        data : task
        })
});





// @desc      put  tasks
// @route     put /api/v1/task/:id
// @access    private teacher
exports.updateTask = asyncHandler(async (req, res, next) => {
    let _id = req.params.id
    let body = req.body
    let teacher = body.teacher
    delete body.teacher
    let task = await tasks.findOneAndUpdate({_id,teacher},body,{new:true})
    res.status(200).json({
        success : true , 
        data : task
        })
});




// @desc      delete  task
// @route     delete /api/v1/task/:id
// @access    private teacher
exports.deleteTask = asyncHandler(async (req, res, next) => {
    let _id = req.params.id
    let teacher = req.body.teacher
        let task = await tasks.findOneAndDelete({_id,teacher})
    res.status(200).json({
        success : true , 
        data : task
        })
});