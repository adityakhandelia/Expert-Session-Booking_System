const express=require("express");
const router=express.Router();
const  {
    createBooking,
    getBookings,
    updateBookingStatus,
}=require("../controllers/bookingController");

// Create booking
router.post("/",createBooking);

// Get bookings by email
router.get("/",getBookings);

// Update booking status
router.patch("/:id/status",updateBookingStatus);

module.exports=router;

