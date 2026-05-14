import React, { useState, useEffect } from "react";
import { getExpertById } from "../utils/api";
import { SOCKET_URL } from "../utils/config";
import io from "socket.io-client";

const ExpertDetail = ({ expertId, onBooking, onBack }) => {
    const [expert, setExpert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [socket, setSocket] = useState(null);
    const [bookedSlots, setBookedSlots] = useState({});

    useEffect(() => {
        fetchExpertDetails();
        connectSocket();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [expertId]);

    const connectSocket = () => {
        const newSocket = io(SOCKET_URL);
        newSocket.on("connect", () => {
            console.log("Connected to socket");
            newSocket.emit("join-expert-slots", expertId);
        });

        newSocket.on("slot-update", (data) => {
            if (data.expertId === expertId) {
                setBookedSlots(prev => ({
                    ...prev,
                    [data.date]: {
                        ...prev[data.date],
                        [data.timeSlot]: data.status
                    }
                }));
            }
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected from socket");
        });

        setSocket(newSocket);
    };

    const fetchExpertDetails = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getExpertById(expertId);
            setExpert(data);
        } catch (err) {
            setError(err.message || "Error fetching expert details");
        } finally {
            setLoading(false);
        }
    };

    const handleSlotSelect = (date, timeSlot) => {
        if (!isSlotBooked(date, timeSlot)) {
            onBooking({ expertId, date, timeSlot, expert });
        }
    };

    const isSlotBooked = (date, timeSlot) => {
        return bookedSlots[date]?.[timeSlot] === "booked";
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading expert details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <button className="btn btn-secondary" onClick={onBack}>← Back</button>
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="container">
            <button className="btn btn-secondary" onClick={onBack}>← Back</button>

            {expert && (
                <div className="card" style={{ marginTop: "20px" }}>
                    <h2>{expert.name}</h2>
                    <p><strong>Category:</strong> {expert.category}</p>
                    <p><strong>Experience:</strong> {expert.experience} years</p>
                    <p><strong>Rating:</strong> <span className="rating">★ {expert.rating}</span></p>
                    <p><strong>Bio:</strong> {expert.bio}</p>

                    <h3 style={{ marginTop: "30px", marginBottom: "20px" }}>Available Time Slots</h3>

                    {expert.availableSlots && expert.availableSlots.length > 0 ? (
                        <div className="slots-container">
                            {expert.availableSlots.map(slot => (
                                <div key={slot.date} className="slots-date">
                                    <h4>📅 {new Date(slot.date).toLocaleDateString()}</h4>
                                    <div className="slots-grid">
                                        {slot.slots.map(time => (
                                            <button
                                                key={time}
                                                className={`slot ${isSlotBooked(slot.date, time) ? 'slot-disabled' : ''}`}
                                                onClick={() => handleSlotSelect(slot.date, time)}
                                                disabled={isSlotBooked(slot.date, time)}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No available slots</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExpertDetail;
