import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";

// Send a new message
export const messageRoute = async (req, res) => {
  try {
    const { messages } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message: messages,
      image: " ",
      location: { lat: 0, lng: 0 },
      conversationId: conversation._id,
    });

    // Push message to conversation
    conversation.message.push(newMessage._id);

    // Save both
    await Promise.all([conversation.save(), newMessage.save()]);

    // Emit via socket.io
    const receiverSocketId = getReciverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("❌ Error in messageRoute:", error);
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};

// Get all messages between two users
export const getMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const receiverId = req.params.id;

    // Find conversation between users
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverId] },
    }).populate("message");

    if (!conversation) {
      return res.status(200).json({ success: true, messages: [] });
    }

    console.log("Conversation Message", conversation.message);

    res.status(200).json({ success: true, messages: conversation.message });
  } catch (error) {
    console.error("❌ Error in getMessage:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    });
  }
};
