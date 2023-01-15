const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/auth')
const {authorize,protect} = require('../middleware/auth.js')

router.post('/register',register)
router.post('/login',login)

router.use(protect)


module.exports = router

