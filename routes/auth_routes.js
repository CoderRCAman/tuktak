const router = require('express').Router() ; 
const {getLoginPage, getSignupPage, signup, login} = require('../controller/auth_controller') 

router.route('/login')  
.get(getLoginPage)
.post(login)

router.route('/signup') 
.get(getSignupPage) 
.post(signup)
module.exports = router