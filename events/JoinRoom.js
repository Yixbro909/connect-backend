const JoinRoom = (socket, io) => {
  socket.on("joinuser", ({ username, room_name }) => {
    socket.join(room_name);

    socket.to(room_name).emit("joinuser", username + " joined the chat");
  });
};

module.exports = JoinRoom;
