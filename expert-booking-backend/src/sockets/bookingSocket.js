const Booking = require("../models/Booking");

const bookingSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        // Join room for specific expert slots
        socket.on("join-expert-slots", (expertId) => {
            const roomName = `expert-${expertId}`;
            socket.join(roomName);
            console.log(`User joined room: ${roomName}`);
        });

        // Leave room
        socket.on("leave-expert-slots", (expertId) => {
            const roomName = `expert-${expertId}`;
            socket.leave(roomName);
            console.log(`User left room: ${roomName}`);
        });

        // Broadcast slot update when new booking is created
        socket.on("slot-booked", async (data) => {
            try {
                const {expertId, date, timeSlot} = data;
                const roomName = `expert-${expertId}`;

                // Broadcast to all clients in that expert's room
                io.to(roomName).emit("slot-update", {
                    expertId,
                    date,
                    timeSlot,
                    status: "booked",
                    timestamp: new Date(),
                });

                console.log(`Slot updated for expert ${expertId}`);
            } catch (error) {
                console.error("Error in slot-booked:", error);
            }
        });

        // Handle booking status update
        socket.on("booking-status-update", (data) => {
            const {bookingId, status, expertId} = data;
            const roomName = `expert-${expertId}`;

            io.to(roomName).emit("booking-updated", {
                bookingId,
                status,
                timestamp: new Date(),
            });

            console.log(`Booking ${bookingId} status updated to ${status}`);
        });

        // Disconnect handler
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};

module.exports = bookingSocket;
