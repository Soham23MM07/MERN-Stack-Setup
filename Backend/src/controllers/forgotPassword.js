import { User } from "../models/userModel.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const forgotPassword = async (req, res) => {
  try {
    console.log("inside Forgot Password");

    const { email, googleMail } = req.body;
    if (!email || !googleMail) {
      throw new Error("");
    }

    console.log("Email", email);
    console.log("Email", googleMail);

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Code", code);

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new Error("");
    }
    console.log("user", user);

    user.resetcode = code;
    user.resetCodeExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();
    console.log(user);

    await transporter.sendMail({
      to: googleMail,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${code}`,
    });
    console.log("Mail Received");

    res.json({ message: "Reset code sent to email" });
  } catch (error) {}
};

export const verifyCode = async (req, res) => {
  try {
    const { code } = req.body;
    console.log("Code", code);

    const user = await User.findOne({ resetcode: code });
    if (!user) {
      throw new Error("Code is Expried");
    }
    console.log("user", user);
    res.json({ message: "Code Verified" });
  } catch (error) {
    console.log("Error", error.message);
    res.json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log("Email", email);
    console.log("newPassword", newPassword);

    const user = await User.findOne({ email });

    if (!user || user.resetCodeExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }
    console.log("user", user);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetcode = undefined;
    user.resetCodeExpiry = undefined;
    console.log("complete");

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {}
};
