const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatRooms = require("./roomModel");
const User = require("./userModel");

const usersJoinedRoomSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  joinedRooms: {
    type: [],
    required: false,
  },
});

//register joined room party
usersJoinedRoomSchema.statics.userJoinedRoom = async function (
  username,
  room_name
) {
  const existUser = await User.findOne({ username });

  if (!existUser) {
    throw Error("Username not registered");
  }
  const existUserInCollection = await this.findOne({ username });

  const room = await ChatRooms.findOne({ room_name });

  if (!room) throw Error("Room not found");

  const roomAlreadyJoined = await this.findOne({
    username,
    "joinedRooms.room_name": room_name,
  });

  if (roomAlreadyJoined) throw Error("Room already joined");

  if (!existUserInCollection) {
    await this.create({ username, joinedRooms: [room] });
  } else {
    await this.updateOne({ username }, { $push: { joinedRooms: room } });
  }

  const doc = await this.findOne({ username });

  return doc;
};

module.exports = mongoose.model("usersjoinedroom", usersJoinedRoomSchema);
