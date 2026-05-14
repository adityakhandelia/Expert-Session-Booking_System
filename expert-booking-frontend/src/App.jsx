import React, { useState } from "react";
import ExpertListing from "./components/ExpertListing.jsx";
import ExpertDetail from "./components/ExpertDetail.jsx";
import BookingForm from "./components/BookingForm.jsx";
import MyBookings from "./components/MyBookings.jsx";
import "./index.css";

const App = () => {
    const [currentPage, setCurrentPage] = useState("home");
    const [selectedExpertId, setSelectedExpertId] = useState(null);
    const [bookingData, setBookingData] = useState(null);

    const handleSelectExpert = (expertId) => {
        setSelectedExpertId(expertId);
        setCurrentPage("expert-detail");
    };

    const handleBooking = (data) => {
        setBookingData(data);
        setCurrentPage("booking-form");
    };

    const handleBookingComplete = () => {
        setCurrentPage("my-bookings");
        setBookingData(null);
        setSelectedExpertId(null);
    };

    const handleCancel = () => {
        setCurrentPage("home");
        setSelectedExpertId(null);
        setBookingData(null);
    };

    const handleBack = () => {
        setCurrentPage("home");
        setSelectedExpertId(null);
    };

    const navigateTo = (page) => {
        setCurrentPage(page);
        setSelectedExpertId(null);
        setBookingData(null);
    };

    return (
        <div>
            <nav>
                <div className="container">
                    <h1>⚡ Expert Booking</h1>
                    <div>
                        <a href="#" onClick={() => navigateTo("home")}>Home</a>
                        <a href="#" onClick={() => navigateTo("my-bookings")}>My Bookings</a>
                    </div>
                </div>
            </nav>

            <div style={{ minHeight: "calc(100vh - 100px)", paddingBottom: "40px" }}>
                {currentPage === "home" && (
                    <ExpertListing onSelectExpert={handleSelectExpert} />
                )}

                {currentPage === "expert-detail" && selectedExpertId && (
                    <ExpertDetail
                        expertId={selectedExpertId}
                        onBooking={handleBooking}
                        onBack={handleBack}
                    />
                )}

                {currentPage === "booking-form" && bookingData && (
                    <BookingForm
                        expertId={bookingData.expertId}
                        expertName={bookingData.expert.name}
                        date={bookingData.date}
                        timeSlot={bookingData.timeSlot}
                        onBookingComplete={handleBookingComplete}
                        onCancel={handleCancel}
                    />
                )}

                {currentPage === "my-bookings" && (
                    <MyBookings />
                )}
            </div>

            <footer style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#2c3e50",
                color: "white",
                marginTop: "40px"
            }}>
                <p>&copy; 2026 Expert Booking System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
