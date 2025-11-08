import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isLogin = async (req, res, next) => {
  try {
    console.log(await req.cookies);

    const token = await req.cookies.jwt;
    console.log(token);
    if (!token) {
      throw new Error("JWT Token is not there");
    }
    console.log("soham");

    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    console.log(decode);

    if (!decode) {
      throw new Error("Token Doesn't match");
    }
    const user = await User.findById(decode.userId).select("-password");
    console.log(user);

    if (!user) {
      throw new Error("User not Exist");
    }

    req.user = user;
    console.log("next");
    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
