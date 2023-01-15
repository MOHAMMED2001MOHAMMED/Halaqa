const announcement = require('../models/announcement')
const asyncHandler = require('../middleware/async') 



// @desc      create  announcement
// @route     post /api/v1/announcement
// @access    private coordinator
exports.createAnnouncement = asyncHandler(async (req, res, next) => {
    let body = req.body
    body.image = []
    if(req.files){

        req.files.image.forEach(element => {
            body.image.push(element.location)
        });
    }
    let announcementSave = new announcement(body)
        await announcementSave.save()
    res.status(200).json({
        success : true , 
        data : announcementSave
    });
});




// @desc      get all the announcements
// @route     GET /api/v1/announcement
// @access    public
exports.getAllAnnouncements = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
  });



// @desc      get  announcements
// @route     GET /api/v1/announcements/:id
// @access    Public
exports.getAnnouncements = asyncHandler(async (req, res, next) => {
        let task = await tasks.findById(req.params.id)
        res.status(200).json({
            success : true , 
            data : task
            })
});










// @desc      update  announcements
// @route     put /api/v1/announcements/:id
// @access    private coordinator
exports.updateAnnouncements = asyncHandler(async (req, res, next) => {
    let _id = req.params.id
    let updated = await announcement.findByIdAndUpdate(_id,req.body,{new:true})
    res.status(200).json({
        success : true , 
        data : updated
        })
});




// @desc      delete  task
// @route     delete /api/v1/announcement/:id
// @access    private coordinator
exports.deleteAnnouncement = asyncHandler(async (req, res, next) => {
    let id = req.params.id
        let deleted = await announcement.findByIdAndDelete(id)
    res.status(200).json({
        success : true , 
        data : deleted
        })
});