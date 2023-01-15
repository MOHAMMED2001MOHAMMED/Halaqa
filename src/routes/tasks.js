const express = require('express');
const router = express.Router();
const {addTask,deleteTask,getAllTasks,getTask,getTasksMe,updateTask} = require('../controllers/tasks')
const {authorize,protect} = require('../middleware/auth.js')
const advancedResults = require('advanced-results');
const tasks= require('../models/tasks')

router.use(protect) 
router.post('/',authorize('teacher'),addTask)

router.get('/',authorize('coordinator'), advancedResults(tasks) ,getAllTasks)

router.get('/:id',authorize('coordinator','teacher','parent'),getTask)

router.get('/tasks/Me',authorize('teacher','parent'),getTasksMe)

router.put('/:id',authorize('teacher'),updateTask) 

router.delete('/:id',authorize('teacher'),deleteTask)

module.exports = router

