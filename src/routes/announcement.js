const express = require('express');
const router = express.Router();
const {createAnnouncement,deleteAnnouncement,getAnnouncements,getAllAnnouncements,updateAnnouncements} = require('../controllers/announcement')
const {authorize,protect} = require('../middleware/auth.js')
const advancedResults = require('advanced-results');
const announcement= require('../models/announcement')
let upload =require('./S3')


router.get('/',advancedResults(announcement) ,getAllAnnouncements)
router.get('/:id',getAnnouncements)

router.use(protect)

const cpUpload = upload.fields([
    { name: 'image', maxCount: 5 }

  ])


router.post('/',authorize('coordinator'),cpUpload,createAnnouncement)

router.put('/:id',authorize('coordinator'),updateAnnouncements) 

router.delete('/:id',authorize('coordinator'),deleteAnnouncement)

module.exports = router

