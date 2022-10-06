const {getUploadPage, uploadVideo} = require('../controller/upload_controller') ;
const router = require("express").Router(); 

router.route('/upload') 
.get(getUploadPage) 
.post(uploadVideo)

module.exports = router ;