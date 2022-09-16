const { getLandingPage } = require('../controller/landing_controller');

const router = require('express').Router() ; 
router.route('/home')
.get(getLandingPage) ;

module.exports = router ;