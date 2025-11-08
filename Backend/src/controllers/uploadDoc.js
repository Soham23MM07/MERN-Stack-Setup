import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

export const uploadDoc = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const file = req.files?.docupload?.[0];
    console.log("Got Document", file);

    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname
    );

    const docUrl = result.secure_url;

    let chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: " ",
      image: " ",
      video: " ",
      document: docUrl,
      location: {
        lat: 0,
        lng: 0,
      },
      conversationId: chats._id,
    });

    await newMessage.save();

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
