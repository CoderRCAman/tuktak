const router = require('express').Router() ;
const {getHomePage} = require('../controller/home_controller') ;
router.route('/')
.get(getHomePage) 
.post() 
.patch()
.delete()  

module.exports = router ;