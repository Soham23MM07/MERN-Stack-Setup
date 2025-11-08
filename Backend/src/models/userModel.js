import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"], // use to set predefine user values
    },
    profilePic: {
      type: String,
      required: false,
      default: "",
    },
    resetcode: {
      type: String,
      required: false,
      default: " ",
    },
    resetCodeExpiry: Date,
    googlemail: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
