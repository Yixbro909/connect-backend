const express = require("express");
const {
  getRooms,
  createRoom,
  singleRoomByID,
  singleRoomByRoomName,
  joinRoom,
  leaveRoom,
} = require("../controllers/roomController");
const roomRouter = express.Router();
//get all rooms
roomRouter.get("/getrooms", getRooms);

//get single room by id
roomRouter.get("/getroom/:id", singleRoomByID);

//get single room by roomname
roomRouter.get("/getroom/search/:roomname", singleRoomByRoomName);

//joined room
roomRouter.post("/joinroom", joinRoom);

//leave room
roomRouter.patch("/leaveroom", leaveRoom);

//create a room
roomRouter.post("/createRoom", createRoom);

module.exports = roomRouter;
