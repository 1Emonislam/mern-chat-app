require("dotenv").config();
const express = require('express');
const { notFound, errorHandlerNotify } = require('strong-errors-handler');
//import Need Routes
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes')
const app = express();
const cors = require('cors');
const dbConnect = require('./config/db');
const port = process.env.PORT || 5000;
//middelware 
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//db
dbConnect();
//routes
app.use('/', userRoutes);
app.use('/', chatRoutes);
app.use('/', messageRoutes)

const __dirname1 = path.resolve();
if (process.env.Node_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is Running Successfully')
    })
}
//errorHandler
app.use(notFound)
app.use(errorHandlerNotify)
const server = app.listen(port, () => {
    console.log('listening on', port);
});
const io = require("socket.io")(server, {
    pingTimeOut: 60000,
    cors: {
        origin: "*"
    }
});
io.on("connection", (socket) => {
    console.log("connected to socket.io")
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connected');
    })
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("user jined room:" + room)
    })
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    socket.on("new message", (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        chat.users.forEach(user => {
            if (user._id?.toString() === newMessageRecieved.sender._id?.toString()) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved)
        })
    })
    socket.off("setup", () => {
        console.log("USer DISCONNECTED");
        socket.leave(userData._id)
    })
})