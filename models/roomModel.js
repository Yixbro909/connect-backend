const mongoose = require("mongoose");

const schema = mongoose.Schema;

const roomSchema = new schema(
  {
    room_name: {
      type: String,
      required: true,
      unique: true,
    },
    creator: {
      type: String,
      required: true,
    },
    messages: {
      type: [],
      required: false,
    },
    joinedUsers: {
      type: [],
      required: false,
    },
  },
  { timestamps: true }
);

//createRoom statics method
roomSchema.statics.createRoom = async function (room_name, creator) {
  if (!room_name || !creator) {
    throw Error("All field must be filled");
  }

  const checkExistRoom = await this.findOne({ room_name });
  if (checkExistRoom) {
    throw Error("Room already available");
  }

  const room = await this.create({
    room_name,
    creator,
    messages: [],
    joinedUsers: [creator],
  });

  return room;
};

//join room statics method
roomSchema.statics.joinRoom = async function (username, room_name) {
  const existRoom = await this.findOne({ room_name });

  if (!existRoom) {
    throw Error("No room available");
  }

  const existUserInRoom = await this.findOne({
    room_name,
    joinedUsers: username,
  });

  if (existUserInRoom) {
    throw Error(username + " already in room");
  }

  await this.updateOne({ room_name }, { $push: { joinedUsers: username } });

  return await this.findOne({ room_name });
};

//leave room statics method
roomSchema.statics.leaveRoom = async function (username, room_name) {
  const existRoom = await this.findOne({ room_name });

  if (!existRoom) {
    throw Error("Room not found");
  }

  const existUserInRoom = await this.findOne({
    room_name,
    joinedUsers: username,
  });

  if (!existUserInRoom) {
    throw Error(username + " have not joined the room yet");
  }

  await this.updateOne({ room_name }, { $pull: { joinedUsers: username } });

  return await this.findOne({ room_name });
};

module.exports = mongoose.model("ChatRooms", roomSchema);
