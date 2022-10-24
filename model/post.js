const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    title: String,
    musicTitle: String,
    video_url: {
      url: "",
      file_name: "",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("post", postSchema);
