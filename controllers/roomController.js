const ChatRooms = require("../models/roomModel");
const { ObjectId } = require("mongodb");

// const newMessageChangeStream = ChatRooms.watch();

// newMessageChangeStream.on("change", (change) => {
//   console.log(change);
// });
//get all rooms
const getRooms = async (req, res) => {
  const rooms = [];

  try {
    const response = await ChatRooms.find({});
    await response.forEach((room) => rooms.push(room));

    res.status(200).json(rooms);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//create a new room
const createRoom = async (req, res) => {
  const { room_name, creator } = req.body;

  try {
    const room = await ChatRooms.createRoom(room_name, creator);
    // console.log(room);
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//get a single room by ID
const singleRoomByID = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "this is not a valid Room ID" });
    return;
  }

  try {
    const room = await ChatRooms.findOne({ _id: id });
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//get a single room bg roomname
const singleRoomByRoomName = async (req, res) => {
  const { roomname } = req.params;

  try {
    const room = await ChatRooms.findOne({ room_name: roomname });
    if (!room) {
      throw Error("Room not found");
    }
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//join room
const joinRoom = async (req, res) => {
  const { username, room_name } = req.body;
  try {
    const room = await ChatRooms.joinRoom(username, room_name);
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// leave room
const leaveRoom = async (req, res) => {
  const { username, room_name } = req.body;

  try {
    const updatedRoom = await ChatRooms.leaveRoom(username, room_name);
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getRooms,
  createRoom,
  singleRoomByID,
  singleRoomByRoomName,
  joinRoom,
  leaveRoom,
};
