const express=require("express");
const cors=require("cors");
const http=require("http");
const {Server}=require("socket.io");
const connectDB = require("./config/db");
const expertRoutes=require("./routes/expertRoutes");
const bookingRoutes=require("./routes/bookingRoutes");
const bookingSocket=require("./sockets/bookingSocket");
require("dotenv").config();

const app=express();
const server=http.createServer(app);
const io=new Server(server, {
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
});

connectDB();
app.use(cors());
app.use(express.json());

// Socket.io handler
bookingSocket(io);

app.use("/api/experts",expertRoutes);
app.use("/api/bookings",bookingRoutes);

app.get("/",(req,res)=>{
    res.send("API running");
});

const PORT=process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

module.exports = {server, io};
