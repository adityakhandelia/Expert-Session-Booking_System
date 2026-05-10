require("dotenv").config();
const mongoose=require("mongoose");
const Expert=require("./models/Expert");
const connectDB=require("./config/db");
const experts=[
  {
    name: "John Doe",
    category: "Fitness",
    experience: 5,
    rating: 4.8,
    bio: "Fitness expert",
    availableSlots: [
      {
        date: "2026-05-10",
        slots: ["10:00 AM", "11:00 AM"],
      },
    ],
  },

  {
    name: "Sarah Smith",
    category: "Career",
    experience: 8,
    rating: 4.9,
    bio: "Career mentor",
    availableSlots: [
      {
        date: "2026-05-10",
        slots: ["2:00 PM", "3:00 PM"],
      },
    ],
  },
];
const seedData=async ()=>{
   try{
    await connectDB();
    await Expert.deleteMany();
    await Expert.insertMany(experts);
    console.log("Data seeded");
    process.exit();
   }
   catch(error){
        console.log(error);
        process.exit(1);
   }
};
seedData();