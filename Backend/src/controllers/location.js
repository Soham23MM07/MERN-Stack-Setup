import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const location = async (req, res) => {
  try {
    const user = req.user;
    const { id: receiverId } = req.params;
    const senderId = user._id;

    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Location data missing" });
    }

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
      image: " ",
      location: { lat, lng },
      conversationId: chats._id,
    });

    chats.message.push(newMessage._id);
    await Promise.all([chats.save(), newMessage.save()]);

    const reciverSocketId = getReciverSocketId(receiverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    console.log("newMessage", newMessage);

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error("Send Location Error:", error.message);
    return res.status(500).json({ error: "Failed to send location" });
  }
};
