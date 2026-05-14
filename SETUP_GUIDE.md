# Expert Booking System - Complete Setup & Run Guide

## 📋 Project Status

Your Expert Booking System is **100% complete** with:
- ✅ Full backend with Node.js + Express + MongoDB
- ✅ Real-time updates via Socket.io
- ✅ Complete React frontend with all screens
- ✅ Responsive design & styling
- ✅ Error handling & validation

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ installed
- MongoDB running locally or connection string ready
- Two terminal windows/tabs

---

## 📦 Backend Setup (Terminal 1)

### Step 1: Navigate to Backend
```bash
cd expert-booking-backend
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Configure .env
Your `.env` file should already exist with:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/expert-booking
NODE_ENV=development
```

### Step 4: Seed Database (Optional - Add Sample Experts)
```bash
npm run seed
```

### Step 5: Start Backend Server
```bash
npm run dev
```

**Expected Output:**
```
[nodemon] starting `node src/server.js`
MongoDB Connected
Server running on port 5000
```

✅ Backend ready on: **http://localhost:5000**

---

## 🎨 Frontend Setup (Terminal 2)

### Step 1: Navigate to Frontend
```bash
cd expert-booking-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

> **Note:** This may take 2-5 minutes on first install. If npm install encounters network issues:
> ```bash
> npm install --legacy-peer-deps
> ```

### Step 3: Configure .env
Create/verify `.env` file with:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### Step 4: Start Frontend
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view expert-booking-frontend in the browser.

Local:            http://localhost:3000
```

✅ Frontend ready on: **http://localhost:3000**

---

## ✨ Features to Test

Once both backend and frontend are running:

### 1. **Expert Listing**
- Go to home page
- See all experts displayed in grid
- Search experts by name (e.g., "John")
- Filter by category
- Test pagination (if more than 5 experts)

### 2. **Expert Detail**
- Click on any expert card
- View their profile details
- See available time slots grouped by date
- Observe real-time updates (open in 2 tabs and book from one tab)

### 3. **Booking**
- Click on a time slot
- Fill the booking form
  - Name, Email, Phone, Notes
- Verify form validation (try invalid email, phone)
- Click "Confirm Booking"
- See success message
- Slot should become disabled

### 4. **My Bookings**
- Click "My Bookings" in navbar
- Enter your email from booking
- View all your bookings with status badges
- Update booking status (Pending → Confirmed → Completed)

---

## 🛠️ API Endpoints

### Test via Postman/cURL

#### Get All Experts
```bash
GET http://localhost:5000/api/experts?page=1&limit=5&search=&category=
```

#### Get Expert By ID
```bash
GET http://localhost:5000/api/experts/{expertId}
```

#### Create Booking
```bash
POST http://localhost:5000/api/bookings
Content-Type: application/json

{
  "expertId": "652abc...",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "date": "2026-05-15",
  "timeSlot": "10:00 AM",
  "notes": "Looking for fitness guidance"
}
```

#### Get User Bookings
```bash
GET http://localhost:5000/api/bookings?email=john@example.com
```

#### Update Booking Status
```bash
PATCH http://localhost:5000/api/bookings/{bookingId}/status
Content-Type: application/json

{
  "status": "Confirmed"
}
```

---

## 🔒 Key Features Implemented

### Double Booking Prevention ✅
- Unique index on (expertId, date, timeSlot) in MongoDB
- Server-side validation before booking creation
- Real-time slot updates via Socket.io

### Real-Time Updates ✅
- Socket.io integration for live slot availability
- Room-based broadcasting (expert-specific updates)
- Automatic UI refresh without page reload

### Input Validation ✅
- Email format validation
- Phone number (10 digits)
- Required fields check
- Server-side validation

### Error Handling ✅
- Meaningful error messages
- Proper HTTP status codes
- User-friendly notifications

---

## 📁 Project Structure

```
expert-booking-backend/
├── src/
│   ├── config/db.js                 # MongoDB connection
│   ├── models/
│   │   ├── Expert.js               # Expert schema
│   │   └── Booking.js              # Booking schema (with unique index)
│   ├── controllers/
│   │   ├── expertController.js
│   │   └── bookingController.js    # Complete CRUD + validation
│   ├── routes/
│   │   ├── expertRoutes.js
│   │   └── bookingRoutes.js
│   ├── sockets/
│   │   └── bookingSocket.js        # Socket.io handlers
│   ├── server.js                   # Express + Socket.io setup
│   └── seeder.js                   # Sample data
├── package.json
├── .env
└── README.md

expert-booking-frontend/
├── src/
│   ├── components/
│   │   ├── ExpertListing.js        # Browse + filter experts
│   │   ├── ExpertDetail.js         # Details + real-time slots
│   │   ├── BookingForm.js          # Booking form + validation
│   │   └── MyBookings.js           # View + manage bookings
│   ├── utils/
│   │   ├── api.js                 # API client functions
│   │   └── config.js              # Configuration
│   ├── App.js                      # Main component + routing
│   ├── index.js                    # React entry point
│   └── index.css                   # Global responsive styles
├── public/index.html
├── package.json
├── .env
└── README.md
```

---

## 🧪 Troubleshooting

### Backend won't start
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`
- Port 5000 is already in use
- Kill the process: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
- Or change PORT in `.env` file

### MongoDB connection fails
**Error:** `MongooseError: Cannot connect to MongoDB`
- Ensure MongoDB is running: `mongod`
- Or check MONGO_URI in `.env` file
- For MongoDB Atlas: Use connection string from dashboard

### npm install fails
**Error:** `npm error code ECONNRESET`
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

### Frontend won't connect to backend
**Error:** Network errors in console
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Check CORS is enabled in backend

### Socket.io not connecting
**Error:** WebSocket errors in browser console
- Verify backend Socket.io is initialized
- Check `REACT_APP_SOCKET_URL` in frontend `.env`
- Ensure both ports match backend

---

## 📱 Browser Testing

- **Chrome**: Fully supported ✅
- **Firefox**: Fully supported ✅
- **Safari**: Fully supported ✅
- **Mobile**: Responsive design works ✅

---

## 🚀 Production Deployment

### Build Frontend
```bash
cd expert-booking-frontend
npm run build
```

Creates `build/` folder with optimized files.

### Environment Variables
**Backend:** Update NODE_ENV to `production`
**Frontend:** Set production API URLs

---

## 📞 Quick Reference Commands

**Backend:**
```bash
npm run dev          # Development with auto-reload
npm start            # Production mode
npm run seed         # Seed database with sample experts
```

**Frontend:**
```bash
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
```

---

## 📊 Database Schema

### Expert Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  experience: Number,
  rating: Number (0-5),
  bio: String,
  availableSlots: [
    {
      date: String (YYYY-MM-DD),
      slots: [String] (e.g., ["10:00 AM", "11:00 AM"])
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Collection
```javascript
{
  _id: ObjectId,
  expertId: ObjectId,
  name: String,
  email: String,
  phone: String,
  date: String (YYYY-MM-DD),
  timeSlot: String,
  notes: String,
  status: "Pending" | "Confirmed" | "Completed",
  createdAt: Date,
  updatedAt: Date
}
```

**Unique Index:** `{expertId: 1, date: 1, timeSlot: 1}`

---

## ✅ Checklist Before Deployment

- [ ] Backend running and connected to MongoDB
- [ ] Frontend running and connecting to backend
- [ ] Expert listing loads correctly
- [ ] Can select expert and view slots
- [ ] Can create booking (form validation works)
- [ ] Real-time slot update works (test in 2 tabs)
- [ ] Can view bookings by email
- [ ] Can update booking status
- [ ] Error handling displays properly
- [ ] Responsive design works on mobile

---

## 📄 License

ISC

---

**Last Updated:** May 2026  
**Status:** ✅ Complete & Ready to Use
