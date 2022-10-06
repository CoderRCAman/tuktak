const { getAuthInfo } = require("../utility");

function getHomePage (req,res) { 
 const userInfo =  getAuthInfo(req) ; 
 return res.render('home.ejs',{user:userInfo}) ; 
}


module.exports = {
    getHomePage 
}