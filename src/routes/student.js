const express = require('express');
const router = express.Router();
const {addStudent,getAllStudent,deleteStudent,getStudent,getStudentsMe,updateStudent} = require('../controllers/student')
const {authorize,protect} = require('../middleware/auth.js')
const advancedResults = require('advanced-results');
const student= require('../models/student')

router.use(protect)
router.post('/',authorize('coordinator'),addStudent)

router.get('/',authorize('coordinator'), advancedResults(student) ,getAllStudent)

router.get('/:id',authorize('coordinator','teacher','parent'),getStudent)

router.get('/students/me',authorize('teacher','parent'),getStudentsMe)

router.put('/:id',authorize('coordinator'),updateStudent)

router.delete('/:id',authorize('coordinator'),deleteStudent)

module.exports = router

