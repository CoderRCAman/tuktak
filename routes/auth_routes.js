const router = require('express').Router() ; 
const {getLoginPage, getSignupPage, signup, login, logout} = require('../controller/auth_controller'); 
const { isAuthenticated } = require('../middleware/auth');

router.route('/login')  
.get(  getLoginPage)
.post( login)

router.route('/signup') 
.get(  getSignupPage) 
.post( signup) 

router.route('/logout')
.get(isAuthenticated , logout)
module.exports = router