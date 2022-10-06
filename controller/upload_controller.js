const { IncomingForm } = require("formidable");
const path = require("path");
const { getAuthInfo } = require("../utility/index");
const _ = require("lodash");
const Post = require("../model/post");
const User = require("../model/user");
function getUploadPage(req, res) {
  const userInfo = getAuthInfo(req);
  return res.render("upload.ejs", { user: userInfo });
}
async function uploadVideo(req, res) {
  const user = getAuthInfo(req);
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
        const newPost = new Post({
          title: fields.title,
          nusicTitle: fields.musicTitle,
          video_url: {
            url: `http://localhost:5000/videos/${files.file.newFilename}`,
            file_name: files.file.newFilename,
          },
        });
        console.log(newPost.video_url)
        await newPost.save();
        await User.findByIdAndUpdate(user.user_id, {
          $addToSet: { post: user.user_id },
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

module.exports = { getUploadPage, uploadVideo };
