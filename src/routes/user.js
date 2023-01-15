const express = require('express');
const router = express.Router();
const {getAllUsers,getUser} = require('../controllers/user')
const {authorize,protect} = require('../middleware/auth.js')
const advancedResults = require('advanced-results');
const user= require('../models/user')

router.use(protect)

router.get('/',authorize('coordinator'), advancedResults(user) ,getAllUsers)
router.get('/:id',authorize('coordinator'),getUser)



module.exports = router

