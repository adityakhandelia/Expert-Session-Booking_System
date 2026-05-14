import React, { useState } from "react";
import { createBooking } from "../utils/api";
import io from "socket.io-client";
import { SOCKET_URL } from "../utils/config";

const BookingForm = ({ expertId, expertName, date, timeSlot, onBookingComplete, onCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        notes: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) return "Name is required";
        if (!formData.email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email format";
        if (!formData.phone.trim()) return "Phone is required";
        if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) return "Phone must be 10 digits";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            const bookingData = {
                expertId,
                date,
                timeSlot,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                notes: formData.notes || ""
            };

            const response = await createBooking(bookingData);

            // Notify others via Socket.io
            const socket = io(SOCKET_URL);
            socket.emit("slot-booked", {
                expertId,
                date,
                timeSlot
            });
            socket.disconnect();

            setSuccess("Booking created successfully! ✓");
            setTimeout(() => {
                onBookingComplete();
            }, 2000);
        } catch (err) {
            setError(err.message || "Error creating booking");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <button className="btn btn-secondary" onClick={onCancel} style={{ marginBottom: "20px" }}>← Cancel</button>

            <form onSubmit={handleSubmit}>
                <h2>Book Appointment</h2>

                <div className="card" style={{ marginBottom: "30px", backgroundColor: "#f9f9f9" }}>
                    <p><strong>Expert:</strong> {expertName}</p>
                    <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {timeSlot}</p>
                </div>

                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}

                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit phone number"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any additional notes for the expert..."
                    ></textarea>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={loading}
                    >
                        {loading ? "Booking..." : "Confirm Booking"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
