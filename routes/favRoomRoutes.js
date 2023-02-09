const express = require("express");
const {
  getFavRoom,
  createFavRoom,
  deleteFavRoom,
} = require("../controllers/favRoomController");

const favRoomRouter = express.Router();

//create favorite room route
favRoomRouter.post("/create_fav_room", createFavRoom);

//get favorite room route
favRoomRouter.get("/get_fav_room/:username", getFavRoom);

//remove favorite room
favRoomRouter.delete("/del_fav_room/", deleteFavRoom);

module.exports = favRoomRouter;
