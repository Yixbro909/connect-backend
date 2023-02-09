// const { update } = require("../models/roomModel");
const ChatRooms = require("../models/roomModel");
const User = require("../models/userModel");
const RecentChatModel = require("../models/recentChatModel");

function listenForRecentChat(socket, io) {
  let username;

  socket.on("getUsername", (data) => {
    username = data;
  });

  const changeStreams = ChatRooms.watch();

  changeStreams.on("change", async (data) => {
    const changedDoc = data.updateDescription;

    // console.log(changedDoc);

    // const room = await ChatRooms.findOne({ _id: data.documentKey });

    // const newChatRecord = {
    //   ...changedDoc,
    //   roomID: room._id,
    //   room_name: room.room_name,
    // };

    // if (Object.keys(changedDoc).join("").includes("messages")) {
    //   room.joinedUsers.forEach(async (user) => {
    //     try {
    //       await RecentChatModel.recentChatRoom(user, newChatRecord);
    //       // console.log("successfully emitted the new messages to the joinedUsers");
    //     } catch (err) {
    //       console.lo(err);
    //     }
    //   });
    // } else {
    //   console.log("false");
    // }
  });
}

module.exports = listenForRecentChat;
