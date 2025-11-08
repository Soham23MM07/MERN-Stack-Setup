import { Conversation } from "../models/conversationModel.js";
import { User } from "../models/userModel.js";

export const searchUser = async (req, res) => {
  console.log("here i am in search user");

  try {
    console.log("soham");

    const search = req.query.search || "";
    const currentuser = req.user._id;
    console.log("current", currentuser);

    const user = await User.find({
      $and: [
        {
          $or: [
            { userName: { $regex: ".*" + search + ".*", $options: "i" } },
            { fullName: { $regex: ".*" + search + ".*", $options: "i" } },
          ],
        },
        {
          _id: { $ne: currentuser },
        },
      ],
    }).select("-password");

    console.log("User", user);

    res.status(201).json({ message: user });
  } catch (error) {}
};

export const currentChatter = async (req, res) => {
  console.log("inside current chatter");

  try {
    const currentUserID = req.user._id;
    const currenTChatters = await Conversation.find({
      participants: currentUserID,
    }).sort({
      updatedAt: -1,
    });

    console.log("CurrentChatters", currenTChatters);

    if (!currenTChatters || currenTChatters.length === 0) {
      return res.status(201).send([]);
    }
    const partcipantsIDS = currenTChatters.reduce((ids, conversation) => {
      const otherParticipents = conversation.participants.filter(
        (id) => id !== currentUserID
      );
      return [...ids, ...otherParticipents];
    }, []);

    console.log("otherParticipents", partcipantsIDS);

    const otherParticipentsIDS = partcipantsIDS.filter(
      (id) => id.toString() !== currentUserID.toString()
    );
    // finding id's of the other participant which is present in otherParticipents array

    console.log("otherparty", otherParticipentsIDS);

    const user = await User.find({ _id: { $in: otherParticipentsIDS } }).select(
      "-password -email"
    );
    const users = otherParticipentsIDS.map((id) =>
      user.find((user) => user._id.toString() === id.toString())
    );
    console.log("done");

    res.status(201).json({ message: user });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log(error);
  }
};
