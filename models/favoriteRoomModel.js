const mongoose = require("mongoose");
const User = require("../models/userModel");

const schema = mongoose.Schema;

favoriteRoomSchema = new schema({
  username: {
    type: String,
    required: true,
  },
  favoriteRooms: {
    type: [],
    required: false,
  },
});

//create favorite room static
favoriteRoomSchema.statics.createFavRoom = async function (username, room) {
  if (!username || !room) {
    throw Error("field is missing");
  }

  const checkIfUserExistInApp = await User.findOne({ username });

  if (!checkIfUserExistInApp) {
    throw Error("User not recognize, please signup or login");
  }

  const existUser = await this.findOne({ username });

  let updatedUser;
  if (!existUser) {
    updatedUser = await this.create({ username, favoriteRooms: [room] });
  } else {
    const existRoom = await this.findOne({
      username,
      "favoriteRooms.room_name": room.room_name,
    });

    if (existRoom) {
      throw Error("You already select room as favorite");
    }
    updatedUser = await this.updateOne(
      { username },
      { $push: { favoriteRooms: room } }
    );
  }

  return updatedUser;
};

//delete favorite room  statics
favoriteRoomSchema.statics.deleteFavRoom = async function (username, room) {
  const existUser = await this.findOne({ username });

  if (!existUser) {
    throw Error("username not identify");
  }

  const deletedItem = await this.updateOne(
    { username },
    { $pull: { favoriteRooms: room } }
  );

  return deletedItem;
};

module.exports = mongoose.model("usersfavchatrooms", favoriteRoomSchema);
