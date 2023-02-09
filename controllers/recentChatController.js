const RecentChatModel = require("../models/recentChatModel");

const recentChats = async (req, res) => {
  const { username } = req.body;

  try {
    const recentRoomMessages = await RecentChatModel.findOne({ username });
    res.status(200).json(recentRoomMessages.newRoomMessages);
  } catch (err) {
    res.status(400).json({
      msg: "could not retrieve your recent chats",
      error: err.message,
    });
  }
};

module.exports = { recentChats };
