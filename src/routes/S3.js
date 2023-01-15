const path = require('path')

const multerS3 = require('multer-s3')
const multer = require('multer')
const S3 = require('aws-sdk/clients/s3')

const region = ""
const accessKeyId = ""
const secretAccessKey = "l"


  const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey

})
//const s3 = new S3Client(credentials)

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "",
      key: function(req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, Date.now()+ ext)
    }
  })
})



module.exports = upload