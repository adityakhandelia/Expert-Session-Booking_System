const Booking=require("../models/Booking");
const Expert=require("../models/Expert");

const createBooking=async (req,res) =>{
    try{
        const {
            expertId,
            name,
            email,
            phone,
            date,
            timeSlot,
            notes,
        }=req.body;

        // Validation
        if(!expertId||!name||!email||!date||!phone||!timeSlot){
            return res.status(400).json({
                message:"All required fields must be filled",
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message:"Invalid email format",
            });
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
            return res.status(400).json({
                message:"Invalid phone number",
            });
        }

        // Check if expert exists
        const expert = await Expert.findById(expertId);
        if (!expert) {
            return res.status(404).json({
                message:"Expert not found",
            });
        }

        // Check if slot is still available (race condition handling)
        const existingBooking = await Booking.findOne({
            expertId,
            date,
            timeSlot,
        });

        if (existingBooking) {
            return res.status(400).json({
                message:"This slot is already taken",
            });
        }

        const booking =await Booking.create({
            expertId,
            name,
            email,
            phone,
            date,
            timeSlot,
            notes: notes || "",
        });

        // Populate expert details
        await booking.populate("expertId");

        res.status(201).json({
            message:"Booking created successfully",
            booking,
        });
    }
    catch(error){
        if(error.code==11000){
            return res.status(400).json({
                message:"This slot is already taken",
            });
        }
        res.status(500).json({
            message:error.message,
        });
    }
};

const getBookings=async (req,res) =>{
    try{
        const email=req.query.email;

        if (!email) {
            return res.status(400).json({
                message:"Email query parameter is required",
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message:"Invalid email format",
            });
        }

        const bookings = await Booking.find({email}).populate("expertId").sort({createdAt: -1});

        res.json({
            message:"Bookings retrieved successfully",
            bookings,
            total:bookings.length,
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};

const updateBookingStatus=async (req,res) =>{
    try{
        const {id}=req.params;
        const {status}=req.body;

        // Validation
        if (!status) {
            return res.status(400).json({
                message:"Status is required",
            });
        }

        const validStatuses = ["Pending", "Confirmed", "Completed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message:"Invalid status. Must be Pending, Confirmed, or Completed",
            });
        }

        const booking = await Booking.findByIdAndUpdate(
            id,
            {status},
            {new:true}
        ).populate("expertId");

        if (!booking) {
            return res.status(404).json({
                message:"Booking not found",
            });
        }

        res.json({
            message:"Booking status updated successfully",
            booking,
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};

module.exports={
    createBooking,
    getBookings,
    updateBookingStatus,
};

