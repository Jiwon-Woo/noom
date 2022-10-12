import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

// 같은 서버(포트)에서 http, WebSocket 둘 다 작동시키기
const server = http.createServer(app);
// 인자를 아무것도 안줘도 WebSocket이 작동할 서버를 만들 수 있지만
// http와 같은 서버를 공유할 것이기 때문에 인자로 server를 넘겨준다
const wss = new WebSocket.Server({ server });

function handleConnection(socket) {
  console.log(socket);
}

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

server.listen(3000, handleListen);
