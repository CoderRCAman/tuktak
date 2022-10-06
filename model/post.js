const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: String,
    musicTitle: String,
    video_url: {
      url: "",
      file_name: "",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('post',postSchema) ;