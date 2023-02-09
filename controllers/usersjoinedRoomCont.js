const UsersJoinedRoomModel = require("../models/usersJoinedRoomModel");

const joinRoom = async (req, res) => {
  const { username, room_name } = req.body;

  try {
    const data = await UsersJoinedRoomModel.userJoinedRoom(username, room_name);
    // console.log(data);
    res.status(200).json({ msg: "OK" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

//find users joined rooms
const findUser = async (req, res) => {
  const { username } = req.body;

  try {
    const room = await UsersJoinedRoomModel.findOne({ username });
    // console.log(recentJoinedRooms);
    res.status(200).json(room.joinedRooms);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { joinRoom, findUser };
