import axios from "axios";
import { Message } from "../models/messageModel.js";

export const downloadFile = async (req, res) => {
  console.log("Backend Download File");

  try {
    const userId = req.user._id; // authenticated user
    const messageId = req.params.id;

    console.log("userId", userId);
    console.log("messageId", messageId);

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).send("File not found");
    console.log("Message", message);

    // Authorization: only sender or receiver can download

    console.log("Soham");

    // Pick the first available file
    const fileUrl = message.document || message.video || message.image;
    if (!fileUrl) return res.status(400).send("No file attached");
    console.log("FileUrl", fileUrl);

    // Stream the file from Cloudinary
    const response = await axios.get(fileUrl, { responseType: "stream" });
    console.log("Response", response);

    // Force browser to download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileUrl.split("/").pop()}"`
    );

    response.data.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Download failed");
  }
};
