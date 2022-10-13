import http from "http";
// import WebSocket from "ws";
import SocketIO from "socket.io";
import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
// app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

const httpServer = http.createServer(app);
const io = SocketIO(httpServer);

io.on("connection", (socket) => {
  // console.log(socket);
  socket.on("enter_room", (msg, func) => {
    console.log(msg);
    setTimeout(() => {
      // func은 프론트엔드에서 실행됨
      func("hello from backend");
    }, 10000);
  });
});

/*
const sockets = [];

// socket: 브라우저랑 연결된 소켓
wss.on("connection", (socket) => {
  socket["nickname"] = "Anon";
  sockets.push(socket);
  console.log("Connected to Browser");

  socket.on("close", () => {
    console.log("Disconnected from Browser");
  });

  socket.on("message", (msg) => {
    const message = JSON.parse(msg.toString("utf8"));
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }
  });
});
*/

httpServer.listen(3000, handleListen);
