const express = require("express");
const { createServer } = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const db = require("./Config/db");
const router = require("./Routes/userRouter");
const chatrouter = require("./Routes/chatRouter");
const messageRouter = require("./Routes/messageRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router)
app.use("/api/chat", chatrouter)
app.use("/api/message", messageRouter)

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log(socket.id);
});

app.listen(5000, () => {
  db();
  console.log("listing...");
});
