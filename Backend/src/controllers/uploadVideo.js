import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

export const uploadVideo = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const file = req.files?.videoupload?.[0];
    console.log("Got the Video", file);

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const response = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname
    );
    const videoUrl = response.secure_url;

    let chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, receiverId],
        message: [],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: " ",
      video: videoUrl,
      image: " ",
      location: {
        lat: 0,
        lng: 0,
      },
      conversationId: chats._id,
    });

    if (newMessage) {
      chats.message.push(newMessage._id);
      await chats.save();
    }

    const receiverSocketId = await getReciverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    console.log("newMessage", newMessage);

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error("Video upload failed:", error.message);
    res.status(500).json({ error: "Failed to upload Video" });
  }
};
