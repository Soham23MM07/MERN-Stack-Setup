import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { jwtToken } from "../utils/jsonwebtoken.js";
export const registerUser = async (req, res) => {
  try {
    console.log(req.body);

    const { fullName, gender, email, password, userName, profilepic } =
      req.body;

    console.log("hello");

    const user = await User.findOne({ userName, email });
    if (user) {
      throw new Error("User already Exists");
    }

    console.log(user);

    const hashPassword = bcryptjs.hashSync(password, 10);
    const profileboy = ``;
    const profilegirl = ``;
    console.log("mello");

    const newUser = await User.create({
      fullName,
      gender,
      email,
      userName,
      password: hashPassword,
      profilePic: profilepic,
    });

    console.log("NewUser", newUser);

    if (newUser) {
      jwtToken(newUser._id, res);
    }
    if (!newUser) {
      throw new Error("Getting error for creating the user");
    }

    console.log("Hello");

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      gender: newUser.gender,
      userName: newUser.userName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("soham");

    const user = await User.findOne({
      email,
    });

    console.log(user);

    if (!user) {
      throw new Error("User is not Register");
    }

    const comparepass = bcryptjs.compareSync(password, user.password || "");
    if (!comparepass) {
      throw new Error("Incorrect Password");
    }

    console.log("mello");

    jwtToken(user._id, res);

    console.log("kello");

    res.status(201).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
      userName: user.userName,
      gender: user.gender,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(201).json({ message: "User Logout Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
