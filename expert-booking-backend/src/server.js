const express=require("express");
const cors=require("cors");
const connectDB = require("./config/db");
const expertRoutes=require("./routes/expertRoutes");
require("dotenv").config();
const app=express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/experts",expertRoutes);
app.get("/",(req,res)=>{
    res.send("API running");
}
);
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on portn ${PORT}`);
});