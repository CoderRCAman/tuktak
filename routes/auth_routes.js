const router = require('express').Router() ; 
const {getLoginPage, getSignupPage} = require('../controller/auth_controller') 

router.route('/login')  
.get(getLoginPage)

router.route('/signup') 
.get(getSignupPage)
module.exports = router