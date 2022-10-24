const { IncomingForm } = require("formidable");
const path = require("path");
const { getAuthInfo } = require("../utility/index");
const _ = require("lodash");
const Post = require("../model/post");
const User = require("../model/user");
const Comment = require("../model/comment");
function getUploadPage(req, res) {
  const userInfo = getAuthInfo(req);
  return res.render("upload.ejs", { user: userInfo });
}
async function uploadVideo(req, res) {
  const user = getAuthInfo(req);//who is uploading 
  try {
    const options = {
      keepExtensions: true,
      allowEmptyFiles: false,
      maxFileSize: 40 * 1024 * 1024,
      uploadDir: path.join(__dirname, "..", "videos"),
    };
    const form = new IncomingForm(options);

    form.parse(req, async (err, fields, files) => {
      if (err) {
        if (err.code === 1009)
          return res.status(500).json({ msg: "Maximum supported file is 5mb" });
        else return res.status(500).json({ msg: "Somethings went wrong!" });
      }
      if (_.isEmpty(files)) {
        return res.status(400).json({ msg: "No video file to process!" });
      }
      try { 
        console.log(fields);
        const newPost = new Post({
          user: user.user_id,
          title: fields.title,
          musicTitle: fields.musicTitle,
          video_url: {
            url: `http://localhost:5000/videos/${files.file.newFilename}`,
            file_name: files.file.newFilename,
          },
        });
        console.log(newPost.video_url);
        await newPost.save();
        await User.findByIdAndUpdate(user.user_id, {
          $addToSet: { post: newPost._id },
        });
        return res.status(200).json({
          msg: "Uploaded!",
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error!");
  }
}

async function postComment(req, res) {
  const user = getAuthInfo(req);
  const { comment } = req.body; 
  console.log(req.body);
  const { id } = req.params;
  try {
    if (!comment) return res.status(401).json({ msg: "No comment was found!" });
    const newComment = new Comment({
      user: user.user_id,
      comment: comment,
    });
    await newComment.save();
    await Post.findByIdAndUpdate(id, {
      $push : {comments:newComment._id}
    });
    return res.status(200).json({msg:"OK!"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}
module.exports = { getUploadPage, uploadVideo, postComment };
