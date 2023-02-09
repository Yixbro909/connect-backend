const { joinRoom, findUser } = require("../controllers/usersjoinedRoomCont");

const express = require("express");
const usersJoinedRoomRouter = express.Router();

usersJoinedRoomRouter.post("/", joinRoom);

usersJoinedRoomRouter.post("/:username", findUser);
module.exports = usersJoinedRoomRouter;
