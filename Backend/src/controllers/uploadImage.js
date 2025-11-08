import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const uploadImage = async (req, res) => {
  try {
    const user = req.user;
    const { id: receiverId } = req.params;
    const senderId = user._id;

    const file = req.files?.imageupload?.[0]; // ✅ matches multer field name
    console.log("file");

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // 📌 Upload to Cloudinary
    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname
    );
    const imageUrl = result.secure_url;
    console.log(imageUrl);

    // 📌 Find or create conversation
    let chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    console.log("before chat");

    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, receiverId],
        message: [],
      });
    }

    console.log("after chat");

    // 📌 Create image message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: " ", // text empty
      image: imageUrl,
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

    // 📌 Emit socket event if receiver online
    const reciverSocketId = getReciverSocketId(receiverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    console.log("newMessage", newMessage);

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error("Image upload failed:", error.message);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
