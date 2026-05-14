# Expert Booking System

A real-time expert session booking system with React frontend and Node.js/Express backend.

##  Project Overview

This is a full-stack application that allows users to:
- Browse available experts by category
- View expert details and available time slots
- Book appointments with real-time slot updates
- Track and manage their bookings

##  Project Structure

```
vedaz_assignment/
├── expert-booking-backend/          # Node.js + Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection
│   │   ├── models/
│   │   │   ├── Expert.js           # Expert schema
│   │   │   └── Booking.js          # Booking schema
│   │   ├── controllers/
│   │   │   ├── expertController.js
│   │   │   └── bookingController.js
│   │   ├── routes/
│   │   │   ├── expertRoutes.js
│   │   │   └── bookingRoutes.js
│   │   ├── sockets/
│   │   │   └── bookingSocket.js    # Socket.io handlers
│   │   ├── server.js               # Express server setup
│   │   └── seeder.js               # Database seeder
│   ├── package.json
│   ├── .env                        # Environment variables
│   ├── .gitignore
│   └── README.md
│
└── expert-booking-frontend/         # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── ExpertListing.js
    │   │   ├── ExpertDetail.js
    │   │   ├── BookingForm.js
    │   │   └── MyBookings.js
    │   ├── utils/
    │   │   ├── api.js              # API client
    │   │   └── config.js           # Configuration
    │   ├── App.js                  # Main component
    │   ├── index.js                # React entry
    │   └── index.css               # Global styles
    ├── public/
    │   └── index.html
    ├── package.json
    ├── .env                        # Environment variables
    ├── .gitignore
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend:**
```bash
cd expert-booking-backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/expert-booking
NODE_ENV=development
```

4. **Seed database (optional):**
```bash
npm run seed
```

5. **Start backend server:**
```bash
npm run dev    # Development with auto-reload
# or
npm start      # Production mode
```

Backend will run on: **http://localhost:5000**

### Frontend Setup

1. **Navigate to frontend (in new terminal):**
```bash
cd expert-booking-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

4. **Start frontend:**
```bash
npm start
```

Frontend will open at: **http://localhost:3000**

##  Features Implemented

###  Expert Listing Screen
- Display experts with name, category, experience, rating
- Search by expert name
- Filter by category
- Pagination support (5 experts per page)
- Loading and error states

###  Expert Detail Screen
- Show complete expert profile
- Display available time slots grouped by date
- Real-time slot updates when booked by another user
- Socket.io integration for live updates
- Click slot to proceed with booking

###  Booking Screen
- Form with fields: Name, Email, Phone, Date, Time Slot, Notes
- Input validation (email format, 10-digit phone)
- Show selected expert and time details
- Success message on successful booking
- Automatic slot disable after booking

###  My Bookings Screen
- Search bookings by email
- Display booking status (Pending, Confirmed, Completed)
- Show booking details (expert, date, time, contact info)
- Update booking status (Pending → Confirmed → Completed)
- Sort bookings by date

###  Backend API
- `GET /api/experts` - Get experts with pagination & filters
- `GET /api/experts/:id` - Get expert details
- `POST /api/bookings` - Create booking (with validation)
- `GET /api/bookings?email=` - Get user bookings
- `PATCH /api/bookings/:id/status` - Update booking status

###  Real-Time Features
- Socket.io for real-time slot updates
- Prevents double booking with unique index
- Race condition handling
- Room-based broadcasting for expert slots

###  Error Handling
- Meaningful validation error messages
- Proper HTTP status codes
- User-friendly error displays
- Success confirmations

##  Security & Validation

### Backend Validation
- Email format validation
- Phone number format (10 digits)
- Required fields validation
- Double-booking prevention via unique index
- Race condition handling in booking creation

### Data Integrity
- MongoDB unique index on (expertId, date, timeSlot)
- Server-side validation before database operations
- Socket.io events for real-time slot synchronization

##  Real-Time Updates via Socket.io

### Socket Events
**Client → Server:**
- `join-expert-slots` - Subscribe to expert's slot updates
- `leave-expert-slots` - Unsubscribe
- `slot-booked` - Notify new booking
- `booking-status-update` - Notify status change

**Server → Client:**
- `slot-update` - Real-time availability change
- `booking-updated` - Status change notification

##  API Examples

### Get Experts
```bash
GET /api/experts?page=1&limit=5&search=John&category=Fitness
```

### Create Booking
```bash
POST /api/bookings
Content-Type: application/json

{
  "expertId": "123abc",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "date": "2026-05-15",
  "timeSlot": "10:00 AM",
  "notes": "Consultation for fitness goals"
}
```

### Get My Bookings
```bash
GET /api/bookings?email=jane@example.com
```

### Update Booking Status
```bash
PATCH /api/bookings/123abc/status
Content-Type: application/json

{
  "status": "Confirmed"
}
```

##  UI/UX Features

- Clean, modern interface
- Responsive design (mobile, tablet, desktop)
- Loading spinners for async operations
- Error messages and success confirmations
- Status badges with color coding
- Disabled states for unavailable slots
- Easy navigation with breadcrumbs
- Consistent styling throughout

##  Responsive Design

- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly buttons and inputs
- Readable typography on all devices
- Flexible navigation

##  Development

### Running Tests
```bash
# Frontend
cd expert-booking-frontend
npm test

# Backend
cd expert-booking-backend
npm test
```

### Code Style
- Consistent naming conventions
- Modular component structure
- Reusable utility functions
- Clear error handling

##  Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- socket.io - Real-time communication
- cors - Cross-origin resource sharing
- dotenv - Environment variables
- nodemon - Development auto-reload

### Frontend
- react - UI framework
- axios - HTTP client
- socket.io-client - WebSocket client
- react-router-dom - Client-side routing

##  Configuration

### Backend Environment Variables
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

### Frontend Environment Variables
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_SOCKET_URL` - WebSocket server URL

##  Support

For issues or questions, refer to individual README files in:
- `expert-booking-backend/README.md`
- `expert-booking-frontend/README.md`



**Last Updated:** May 2026

