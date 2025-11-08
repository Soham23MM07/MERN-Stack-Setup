import express from "express";
import {
  logout,
  registerUser,
  loginUser,
} from "../controllers/registerUser.js";
import { getMessage, messageRoute } from "../controllers/messageController.js";
import { isLogin } from "../middlerware/isLogin.js";
import { currentChatter, searchUser } from "../controllers/searchController.js";
import { upload, uploaddoc, uploadvideo } from "../middlerware/multer.js";
import { uploadprofileimage } from "../controllers/uploadprofileimage.js";
import { uploadDoc } from "../controllers/uploadDoc.js";
import { uploadVideo } from "../controllers/uploadVideo.js";
import { deleteMessage } from "../controllers/deleteMessage.js";
import { uploadImage } from "../controllers/uploadImage.js";
import { location } from "../controllers/location.js";
import { editMessage } from "../controllers/editMessage.js";
import { downloadFile } from "../controllers/downloadFile.js";
import {
  forgotPassword,
  resetPassword,
  verifyCode,
} from "../controllers/forgotPassword.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/send/:id", isLogin, messageRoute);
router.post("/location/:id", isLogin, location);
router.patch("/edit/:id", isLogin, editMessage);
router.get("/get/:id", isLogin, getMessage);
router.get("/search", isLogin, searchUser);
router.get("/currentchatter", isLogin, currentChatter);
router.post("/message/:id", isLogin, deleteMessage);
router.get("/:id", isLogin, downloadFile);
router.post("/forgot-password", forgotPassword);
router.post("/verify-code", verifyCode);
router.post("/reset-password", resetPassword);
router.post(
  "/profileupload",
  upload.fields([
    {
      name: "profilepic",
      maxCount: 1,
    },
  ]),
  uploadprofileimage
);
router.post(
  "/imageupload/:id",
  upload.fields([
    {
      name: "imageupload",
      maxCount: 1,
    },
  ]),
  isLogin,
  uploadImage
);

router.post(
  "/videoupload/:id",
  uploadvideo.fields([
    {
      name: "videoupload",
      maxCount: 1,
    },
  ]),
  isLogin,
  uploadVideo
);

router.post(
  "/documentupload/:id",
  uploaddoc.fields([
    {
      name: "docupload",
      maxCount: 1,
    },
  ]),
  isLogin,
  uploadDoc
);
export default router;
