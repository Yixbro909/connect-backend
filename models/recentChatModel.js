const mongoose = require("mongoose");
const ChatRooms = require("./roomModel");
const User = require("./userModel");

const Schema = mongoose.Schema;

const recentChatSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  newRoomMessages: {
    type: [],
    required: true,
  },
});

//track new incoming messages
recentChatSchema.statics.recentChatRoom = async function (
  username,
  newRoomMessage
) {
  const checkIfUserExistInApp = await User.findOne({ username });

  if (!checkIfUserExistInApp)
    throw Error(username + " is not registered in this app");

  const findUserInCollection = await this.findOne({ username });

  const findRoomInDoc = await this.findOne({
    username,
    "newRoomMessages.room_name": newRoomMessage.room_name,
  });

  console.log(findRoomInDoc);
  if (findUserInCollection) {
    if (findRoomInDoc) {
      await this.updateOne(
        { username, "newRoomMessages.room_name": newRoomMessage.room_name },
        {
          $set: {
            "newRoomMessages.$": newRoomMessage,
          },
        }
      );
    } else {
      await this.updateOne(
        { username },
        { $push: { newRoomMessages: newRoomMessage } }
      );
    }
  } else {
    await this.create({
      username,
      newRoomMessages: [newRoomMessage],
    });
  }

  const recentMessages = await this.findOne({ username }).newRoomMessages;

  return recentMessages;
};

module.exports = mongoose.model("usersrecentchat", recentChatSchema);
