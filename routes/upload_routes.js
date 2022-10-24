const {getUploadPage, uploadVideo, postComment} = require('../controller/upload_controller') ;
const { isAuthenticated } = require('../middleware/auth');
const router = require("express").Router(); 

router.route('/upload') 
.get(isAuthenticated,getUploadPage) 
.post(isAuthenticated,uploadVideo) 

router.route('/comment/:id') 
.patch(isAuthenticated,postComment) ; 

module.exports = router ; 
