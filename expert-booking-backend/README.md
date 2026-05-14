# Expert Booking Backend

Real-time expert session booking system backend built with Node.js, Express, and MongoDB.

## Features

- ✅ Expert listing with search and category filter
- ✅ Pagination support
- ✅ Real-time slot updates using Socket.io
- ✅ Race condition prevention for double booking
- ✅ Booking management (create, retrieve, update status)
- ✅ Validation and error handling
- ✅ Environment variable configuration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Real-time:** Socket.io
- **Utilities:** Mongoose, CORS, dotenv

## Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

## Installation

1. **Clone/Setup the project:**
```bash
cd expert-booking-backend
npm install
```

2. **Create .env file:**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expert-booking
NODE_ENV=development
```

3. **Seed database (optional):**
```bash
npm run seed
```

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on http://localhost:5000

## API Endpoints

### Experts
- `GET /api/experts` - Get all experts (with pagination, search, filter)
  - Query params: `page`, `limit`, `search`, `category`
- `GET /api/experts/:id` - Get expert details

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings?email=` - Get bookings by email
- `PATCH /api/bookings/:id/status` - Update booking status

## WebSocket Events

### Client → Server
- `join-expert-slots` - Join room for expert updates
- `leave-expert-slots` - Leave room
- `slot-booked` - Notify slot booking
- `booking-status-update` - Update booking status

### Server → Client
- `slot-update` - Real-time slot availability update
- `booking-updated` - Booking status update notification

## Database Models

### Expert
```javascript
{
  name: String,
  category: String,
  experience: Number,
  rating: Number,
  bio: String,
  availableSlots: [
    {
      date: String,
      slots: [String]
    }
  ]
}
```

### Booking
```javascript
{
  expertId: ObjectId,
  name: String,
  email: String,
  phone: String,
  date: String,
  timeSlot: String,
  notes: String,
  status: "Pending" | "Confirmed" | "Completed"
}
```

## Key Features Implementation

### Double Booking Prevention
- Unique index on (expertId, date, timeSlot)
- Server-side validation before booking creation
- Race condition handling with socket events

### Real-Time Updates
- Socket.io integration for real-time slot updates
- Room-based broadcasting for specific experts
- Clients join expert rooms to receive updates

## Error Handling

All endpoints return meaningful error responses:
- `400` - Bad request (validation errors)
- `404` - Resource not found
- `500` - Server error

## License

ISC
