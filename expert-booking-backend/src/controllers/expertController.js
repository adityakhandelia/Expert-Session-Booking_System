const Expert=require("../models/Expert");
const getExperts=async(req,res)=>{
    try{
        const page=Number(req.query.page)||1;
        const limit=Number(req.query.limit)||5;
        const skip=(page-1)*limit;
        const search=req.query.search || "";
        const category=req.query.category||"";
        let query={};
        if(search){
            query.name={
                $regex:search,
                $options:"i",
            };
        }
        if(category){
            query.category=category;
        }
        const experts=await Expert.find(query).skip(skip).limit(limit);
        const total=await Expert.countDocuments(query);
        res.json({
            experts,
            currentPage:page,
            totalPages:Math.ceil(total/limit),
            totalExperts:total,
        });
    }catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};
const getExpertById=async(req,res)=>{
      try{
        const expert=await Expert.findById(req.params.id);
        if(!expert){
            return res.status(404).json({
                 message:"Expert not found",
            });
        }
        res.json(expert);
      }
      catch(error){
           res.status(500).json({
            message:error.message,
           });
      }
};
module.exports={
    getExperts,
    getExpertById,
};