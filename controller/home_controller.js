const { getAuthInfo } = require("../utility");

function getHomePage (req,res) { 
 const userInfo =  getAuthInfo(req) ;  
 if(userInfo && userInfo.status) {
    return res.redirect('/home')
   }
 return res.render('home.ejs',{user:userInfo}) ; 
}


module.exports = {
    getHomePage 
}