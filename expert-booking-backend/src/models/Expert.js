const mongoose=require("mongoose");
const expertSchema=new mongoose.Schema(
    {
        name: {
     type:String,
     required:true,
     trim:true,
    },
    category:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        default:5,
    },
    bio:{
        type:String,
        default:"",
    },
    availableSlots:[
        {
            date:String,
            slots:[String],
        },
    ],
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model("Expert",expertSchema);