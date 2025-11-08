import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const editMessage = async (req, res) => {
  try {
    const user = req.user;
    console.log("user", user);

    const receiverId = req.params.id;
    console.log("Req Body", req.body);

    const { newText, id } = req.body;
    console.log(newText);

    // Find message
    const message = await Message.findById(id);
    console.log("Message", message);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    console.log("Done Message find");

    console.log("SenderId", message.senderId.toString());
    console.log("UserId", user._id.toString());

    // Only sender can edit
    if (message.senderId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    console.log("Message", message);

    // Update message
    message.message = newText;
    await message.save();

    // Inform receiver in real-time
    const receiverSocketId = getReciverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("editMessage", { id: id, message: message });
    }

    res.status(201).json({ message: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
