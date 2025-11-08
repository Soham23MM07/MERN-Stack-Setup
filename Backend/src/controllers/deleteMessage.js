import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";
import { deletefromcloudniary } from "../utils/cloudinary.js";

export const deleteMessage = async (req, res) => {
  try {
    console.log("Delete Message");

    const { id } = req.body; // extract message id
    console.log(id);

    const fetchedMessage = await Message.findById(id);
    console.log("Deleted", fetchedMessage);

    const imageUrl = fetchedMessage.image;

    console.log("Image Url", imageUrl);

    function extractPublicId(url) {
      // Remove base URL + version
      const parts = url.split("/");
      // e.g. ["https:", "", "res.cloudinary.com", "dyxf0crlu", "image", "upload", "v1755605685", "chat-app", "Screenshot%202024-03-09%20221739.png.png"]

      // Remove cloudinary domain + version number
      const index = parts.findIndex((p) => p.startsWith("v")) + 1;
      const publicId = parts.slice(index).join("/");

      // Decode in case spaces are encoded
      return decodeURIComponent(publicId).replace(/\.[^/.]+$/, "");
    }

    const public_id = extractPublicId(imageUrl);

    console.log("PublicId", public_id);

    const deleteCloud = await deletefromcloudniary(public_id);

    console.log("Cloudinary Message", deleteCloud);

    const deletedMessage = await Message.findByIdAndDelete(id);

    console.log("Message Successfully Deleted", deletedMessage);

    // Remove reference from conversation's messages array
    await Conversation.updateOne({ messages: id }, { $pull: { messages: id } });
    console.log("done");

    try {
      const user = req.user; // assuming req.user is populated correctly
      const receiverId = req.params.id;
      const senderId = user._id;

      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      }).populate("message"); // assuming message is an array of messages

      console.log("converstion", conversation);

      const mess = await Message.find({
        $and: [{ senderId: senderId }, { receiverId: receiverId }],
      });

      console.log("Mess", mess);

      const reciverSocketId = getReciverSocketId(receiverId);

      if (reciverSocketId) {
        io.to(reciverSocketId).emit("deleteMessage", id);
      }
    } catch (error) {
      console.error("Error in getMessage:", error);
      res.status(400).json({ error: error.message });
    }

    return res
      .status(201)
      .json({ success: true, message: "Message deleted    " });
  } catch (error) {
    console.error("Delete message error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
