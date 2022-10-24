const { getAuthInfo } = require("../utility") 
const {isAuthenticated} = require('../middleware/auth')
const Post = require('../model/post') 
const Comment = require('../model/comment')
async function getLandingPage (req,res) {
  const userInfo = getAuthInfo(req) ; 
  
  try {
    const allPost =  await Post.find().sort({"createdAt": 1}).populate('user');  
    console.log("fff" , allPost)
    return res.render('landing.ejs',{user : userInfo ,post:allPost})
  } catch (error) {
    console.log(error) ;
  }

} 

async function getVideoInfo (req,res) {
  const userInfo = getAuthInfo(req) ;    
  const id = req.params.id ; 
  try {
    const post = await Post.findById(id)
    .populate({
      path : 'comments' , 
      populate: {
        path : 'user'
      }
    })
    .populate('user')
    return res.render('video_info.ejs',{user:userInfo , post:post })
  } catch (error) {
    console.log(error) ;
    return res.json({msg:'YOU SUCK!'})  } 
}

module.exports = {getLandingPage,getVideoInfo}  