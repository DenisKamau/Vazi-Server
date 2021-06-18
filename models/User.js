const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      default: "",
      max: 20,
    },
    username: {
      type: String,
      required: true,
      default: "",
      min: 5,
      max: 10,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      min: 8,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.validPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
