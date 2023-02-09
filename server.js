const http = require("http");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");
const { Server } = require("socket.io");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const roomRouter = require("./routes/roomRoutes");
const recentChatRouter = require("./routes/recentChatRoutes");
require("dotenv").config();
const mongoose = require("mongoose");
const usersJoinedRoomRouter = require("./routes/usersJoinedRoomRoutes");

//listen for new incoming messages
const trackChats = require("./events/trackNewChats");

//socket events
const ChatEvent = require("./events/ChatEvent");
const favRoomRouter = require("./routes/favRoomRoutes");
const JoinRoom = require("./events/JoinRoom");
const { ServerApiVersion } = require("mongodb");

//server setup
const server = http.createServer(app);

//middleware
app.use(cors());
// app.use(express.static(path.join(__dirname + "/public")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//users routes
app.use("/user", userRouter);
//chatrooms routes
app.use("/room", roomRouter);
//favroomchat
app.use("/favorite_room", favRoomRouter);
//userJoinRoom
app.use("/userjoinedroom", usersJoinedRoomRouter);
//recent chats routes
app.use("/recentchats", recentChatRouter);

//connect to socket
const liveURL = "https://connect-frontend-six.vercel.app";
const localURL = "http://localhost:3000";

const io = new Server(server, {
  cors: {
    origin: liveURL,
    methods: ["POST", "GET", "DELETE", "PATCH"],
  },
});

io.on("connection", async (socket) => {
  //CHAT EVENT
  ChatEvent(socket, io);

  //WELCOME JOIN USER
  JoinRoom(socket, io);

  //LISTEN TO NEW MESSAGES
  trackChats(socket, io);
});

const localUri = "mongodb://127.0.0.1/ChatDb";
const uri = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@yixbro.x1lp9.mongodb.net/connect?retryWrites=true&w=majority`;
//connect to db
mongoose
  .connect(uri)
  .then(() => {
    // console.log("connect successfully");
    listenToPort();
  })
  .catch((err) => {
    console.log(err);
  });

//testing api
app.get("/test", (req, res) => {
  res.json({ msg: "Api working just fine" });
});

//listen to PORT
function listenToPort() {
  const PORT = process.env.PORT || 9000;
  server.listen(PORT, () => {
    console.log(
      "server listenning to port " + PORT + " and connected to mongodb"
    );
  });
}
