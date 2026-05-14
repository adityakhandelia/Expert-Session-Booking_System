import axios from "axios";
import { API_URL } from "./config";

const getExperts = async (page = 1, limit = 5, search = "", category = "") => {
    try {
        const response = await axios.get(`${API_URL}/experts`, {
            params: {
                page,
                limit,
                search,
                category
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error fetching experts" };
    }
};

const getExpertById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/experts/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error fetching expert" };
    }
};

const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(`${API_URL}/bookings`, bookingData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error creating booking" };
    }
};

const getBookings = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/bookings`, {
            params: { email }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error fetching bookings" };
    }
};

const updateBookingStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${API_URL}/bookings/${id}/status`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Error updating booking status" };
    }
};

export {
    getExperts,
    getExpertById,
    createBooking,
    getBookings,
    updateBookingStatus
};
