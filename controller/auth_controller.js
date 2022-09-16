function getLoginPage(req,res) {
    return res.render('login.ejs') ;
} 
function getSignupPage(req,res) {
    return res.render('signup.ejs')
}

module.exports = {getLoginPage,getSignupPage} ;