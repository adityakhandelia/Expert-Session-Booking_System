const express=require("express")
const {
    getExperts,
    getExpertById,
}=require("../controllers/expertController");


const router=express.Router();
//get all expert
router.get("/",getExperts);
//get single expert
router.get("/:id",getExpertById);   
module.exports=router;