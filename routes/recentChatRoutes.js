const express = require("express");
const { recentChats } = require("../controllers/recentChatController");
const recentChatRouter = express.Router();

recentChatRouter.post("/", recentChats);

module.exports = recentChatRouter;
