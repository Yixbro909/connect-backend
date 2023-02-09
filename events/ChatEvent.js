const { ObjectId } = require("mongodb");
const ChatRooms = require("../models/roomModel");

const ChatEvent = (socket, io) => {
  socket.on("roomchat", async (data) => {
    socket.join(data.roomID);

    const msgData = {
      message: data.message,
      username: data.username,
      timeStamp: data.timeStamp,
    };

    try {
      const updatedRoom = await ChatRooms.updateOne(
        { _id: ObjectId(data.roomID) },
        { $push: { messages: msgData } }
      );
      // console.log(room);
      if (updatedRoom.acknowledged === true) {
        // console.log(msgData);
        const roomMessages = await ChatRooms.findOne({
          _id: ObjectId(data.roomID),
        });

        const limit = 15;

        if (roomMessages.messages.length > limit) {
          const sliceMessageArray = roomMessages.messages.slice(
            roomMessages.messages.length - limit
          );

          io.in(data.roomID).emit("receivechat", sliceMessageArray);
        } else {
          io.in(data.roomID).emit("receivechat", roomMessages.messages);
        }

      }
    } catch (err) {
      console.log(err);
    }

   
  });


  //leave or join room
  socket.on('joinorleave', ({type, roomID}) => {
     switch(type){
       case 'join':
        socket.join(roomID)
        break;

       case 'leave':
       socket.leave(roomID)  
       break;
     }
  })
};

module.exports = ChatEvent;
