const FavRoomChat = require("../models/favoriteRoomModel");

//get favorite room
const getFavRoom = async (req, res) => {
  const { username } = req.params;

  const rooms = await FavRoomChat.findOne({ username });
  try {
    if (!rooms) {
      throw Error(username + " have no favorites");
    }
    res.status(200).json(rooms.favoriteRooms);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//create favorite room
const createFavRoom = async (req, res) => {
  const { username, room } = req.body;

  try {
    const favRoom = await FavRoomChat.createFavRoom(username, room);
    res.status(200).json(favRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteFavRoom = async (req, res) => {
  const { username, room } = req.body;

  try {
    const response = await FavRoomChat.deleteFavRoom(username, room);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getFavRoom, createFavRoom, deleteFavRoom };
