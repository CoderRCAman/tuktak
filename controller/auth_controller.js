const User = require('../model/user') ;
const { getAuthInfo } = require('../utility');
function getLoginPage(req, res) { 
  const userInfo = getAuthInfo(req) ; 
  if(userInfo && userInfo.status) return res.redirect("/") ; 
  return res.render("login.ejs", { error: null ,user:userInfo});
}
function getSignupPage(req, res) { 
  const userInfo = getAuthInfo(req) ;
  if(userInfo && userInfo.status) return res.redirect("/") ; 
  return res.render("signup.ejs", { error: null,user : userInfo });
}

async function login (req,res) { 
  const userInfo = getAuthInfo(req) ;
  if(userInfo && userInfo.status) return res.redirect("/") ; 
  const {email,password} =  req.body ; 
  if (!email || !password )
  return res.render("login", {
    error: "Missing fileds email or password",
  });    
  try {
      const userFound = await User.findOne({email:email}) ; 
      if(!userFound) {
          if(!userFound) return res.render("login", {
              error: "No such user exist!", 
              user:userInfo
            }); 
        }
        console.log(email,password);
    //validate password  
      if(!(await userFound.isValidatedPassword(password))) { 
        console.log('password validated!')
        return res.render("login", {
            error: `Password didn't matched for ${email}`,
            user : userInfo
          }); 
      } 
      res.cookie("loggedIn", true, {
        maxAge: 7 * 24 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("user_id", userFound._id, {
        maxAge: 7 * 24 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("name", userFound.name, {
        maxAge: 7 * 24 * 60 * 1000,
        httpOnly: true,
      }); 
      if(userFound.avatar.url) {
        res.cookie("avatar" , userFound?.avatar.url )
      }
      else {
        res.cookie("avatar" ,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ,{
        maxAge: 7 * 24 * 60 * 1000,
        httpOnly: true,
      })
    }
     
     return res.redirect('/home') 
  } catch (error) {
    console.log(error) ;
    return res.render({error:"Something went wrong!" , user:userInfo})
  }
}

async function signup(req, res) { 
  const userInfo = getAuthInfo(req) ;
  const { email, password,name } = req.body;
  if(userInfo && userInfo.status) return res.redirect("/") ; 
  console.log("called!");
  if (!email || !password ||!name)
    return res.render("signup", {
      error: "Missing fileds email, name or password", 
      user:userInfo
    });   
 try {
    const isUserExist = await User.findOne({email:email}) ; 
    if(isUserExist) return res.render("signup", {
      error: "This email is already taken!",
      user : userInfo
    });   
    const newUser = new User({email,password,name}) ; 
    await newUser.save() ;  
    res.redirect('/login')
 } catch (error) {
    return res.render({error:"Something went wrong!"})
 }
 
}

function logout(req,res) {
  res.cookie('loggedIn', 'false', {
    maxAge: 0,
    overwrite: true,
  });
  res.cookie('user', '', {
    maxAge: 0,
    overwrite: true,
  });
  res.cookie('avatar', '', {
    maxAge: 0,
    overwrite: true,
  });
  return res.redirect('/')
}

module.exports = { getLoginPage, getSignupPage, signup ,login,logout};
