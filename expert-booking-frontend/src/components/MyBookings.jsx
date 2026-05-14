import React, { useState, useEffect } from "react";
import { getBookings, updateBookingStatus } from "../utils/api";

const MyBookings = () => {
    const [email, setEmail] = useState("");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");
        setSearched(true);
        setLoading(true);

        if (!email.trim()) {
            setError("Please enter an email address");
            setLoading(false);
            return;
        }

        try {
            const data = await getBookings(email);
            setBookings(data.bookings || []);
            if (data.bookings.length === 0) {
                setError("No bookings found for this email");
            }
        } catch (err) {
            setError(err.message || "Error fetching bookings");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (bookingId, newStatus) => {
        setUpdatingId(bookingId);
        try {
            const response = await updateBookingStatus(bookingId, newStatus);
            setBookings(bookings.map(b => b._id === bookingId ? response.booking : b));
        } catch (err) {
            alert(err.message || "Error updating booking status");
        } finally {
            setUpdatingId(null);
        }
    };

    const getNextStatus = (currentStatus) => {
        if (currentStatus === "Pending") return "Confirmed";
        if (currentStatus === "Confirmed") return "Completed";
        return null;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="container">
            <h2>My Bookings</h2>

            <form onSubmit={handleSearch} style={{ maxWidth: "500px", marginBottom: "30px" }}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email to view bookings"
                    />
                </div>
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "Searching..." : "Search Bookings"}
                </button>
            </form>

            {error && <div className="error">{error}</div>}

            {loading && (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading bookings...</p>
                </div>
            )}

            {searched && !loading && bookings.length > 0 && (
                <div className="bookings-list">
                    <p style={{ marginBottom: "20px", color: "#666" }}>
                        Found {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
                    </p>
                    {bookings.map(booking => (
                        <div key={booking._id} className="booking-item">
                            <div className="booking-header">
                                <div className="booking-title">
                                    {booking.expertId?.name || 'Unknown Expert'}
                                </div>
                                <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                                    {booking.status}
                                </span>
                            </div>

                            <div className="booking-details">
                                <div className="booking-detail-item">
                                    <span className="booking-detail-label">Category</span>
                                    <span>{booking.expertId?.category || 'N/A'}</span>
                                </div>
                                <div className="booking-detail-item">
                                    <span className="booking-detail-label">Date</span>
                                    <span>{formatDate(booking.date)}</span>
                                </div>
                                <div className="booking-detail-item">
                                    <span className="booking-detail-label">Time</span>
                                    <span>{booking.timeSlot}</span>
                                </div>
                                <div className="booking-detail-item">
                                    <span className="booking-detail-label">Your Name</span>
                                    <span>{booking.name}</span>
                                </div>
                                <div className="booking-detail-item">
                                    <span className="booking-detail-label">Phone</span>
                                    <span>{booking.phone}</span>
                                </div>
                                {booking.notes && (
                                    <div className="booking-detail-item">
                                        <span className="booking-detail-label">Notes</span>
                                        <span>{booking.notes}</span>
                                    </div>
                                )}
                            </div>

                            {getNextStatus(booking.status) && (
                                <div className="booking-actions">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleStatusUpdate(booking._id, getNextStatus(booking.status))}
                                        disabled={updatingId === booking._id}
                                    >
                                        {updatingId === booking._id ? "Updating..." : `Mark as ${getNextStatus(booking.status)}`}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
