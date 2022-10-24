const { getAuthInfo } = require("../utility");
const { IncomingForm } = require("formidable");
const _ = require("lodash");

const User = require("../model/user");
const path = require('path')
const getProfilePage = async (req, res) => {
  const {id} = req.params ; 
  const userInfo = getAuthInfo(req) ;
  let user = await User.findById(id).populate('post') ; 
  user._id = user._id.toString() ;  
  console.log("hsh" ,user)
  const newUser = {
     name : user.name  , 
     email:user.email , 
     post : user.post,
     avatar : user.avatar ,
     _id : user._id.toString()
  }
  console.log(userInfo.user_id ,newUser._id);
  return res.render("Profile.ejs", { error: null, user: userInfo,post:newUser });
};

const getEditProfile = async (req, res) => {
  const userInfo = getAuthInfo(req);
  return res.render("EditProfile.ejs", { error: null, user: userInfo });
};

const editProfile = async (req, res) => {
  const user = getAuthInfo(req);
  try {
    const options = {
      keepExtensions: true,
      allowEmptyFiles: false,
      maxFileSize: 5 * 1024 * 1024,
      uploadDir: path.join(__dirname, "..", "profile"),
    };
    const form = new IncomingForm(options);

    form.parse(req, async (err, fields, files) => {
      if (err) {
        if (err.code === 1009)
          return res.status(500).json({ msg: "Maximum supported file is 5mb" });
        else return res.status(500).json({ msg: "Somethings went wrong!" });
      }
      if (_.isEmpty(files)) {
        return res.status(400).json({ msg: "No Image file to process!" });
      }
      try {
        const updated = await User.findByIdAndUpdate(user.user_id , {
            avatar : {
                url: `http://localhost:5000/profile/${files.file.newFilename}`,
                file_name: files.file.newFilename,
            },
            name : fields.name 
        },{
          new:true
        }) 
        res.cookie("avatar",updated.avatar.url, {
            maxAge: 7 * 24 * 60 * 1000,
            httpOnly: true,
          });
        return res.status(200).json({msg:"Updated!"})
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

module.exports = { getProfilePage, getEditProfile, editProfile };
