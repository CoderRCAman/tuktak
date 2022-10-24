const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not valid email`,
    },
    unique: true,
  },
  name: {
    type: String,
    minLength: [3, "Too short name"],
    maxLength: [40, "Too large name"],
    required: true,
  },
  password: {
    type: String,
    minLength: [3, "Too short password"],
    required: true,
  },
  avatar: {
    url: "",
    file_name: "",
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
//vadlidate the password
userSchema.methods.isValidatedPassword = async function (usersendPassword) {
  try {
    return await bcrypt.compare(usersendPassword, this.password);
  } catch (err) {
    console.log(error);
    return false;
  }
};
module.exports = mongoose.model("user", userSchema);
