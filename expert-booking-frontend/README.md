# Expert Booking Frontend

React web application for booking expert sessions with real-time updates.

## Features

- ✅ Expert listing with search and category filter
- ✅ Pagination for expert browsing
- ✅ Real-time availability updates using Socket.io
- ✅ Expert detail page with time slots
- ✅ Booking form with validation
- ✅ My Bookings page to track appointments
- ✅ Booking status management (Pending → Confirmed → Completed)
- ✅ Responsive design

## Tech Stack

- **Framework:** React 18
- **State Management:** React Hooks
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Real-time:** Socket.io Client
- **Build Tool:** Create React App

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Backend API running on http://localhost:5000

## Installation

1. **Setup the project:**
```bash
cd expert-booking-frontend
npm install
```

2. **Create .env file:**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Running the Application

**Development mode:**
```bash
npm start
```

Application will open at http://localhost:3000

**Build for production:**
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ExpertListing.js      # Expert list with search/filter
│   ├── ExpertDetail.js       # Expert details with slots
│   ├── BookingForm.js        # Booking form component
│   └── MyBookings.js         # User's bookings list
├── pages/                    # Page components
├── utils/
│   ├── api.js               # API client functions
│   └── config.js            # Configuration
├── App.js                    # Main app component
├── index.js                  # React entry point
└── index.css                 # Global styles
```

## Components

### ExpertListing
Displays list of experts with:
- Search by name
- Filter by category
- Pagination
- Loading & error states

### ExpertDetail
Shows expert information and:
- Available time slots grouped by date
- Real-time slot availability (via Socket.io)
- Slot selection for booking

### BookingForm
Booking appointment form with:
- Name, email, phone, notes fields
- Input validation
- Success/error messages
- Expert and slot confirmation

### MyBookings
View personal bookings with:
- Email-based search
- Booking status display
- Status update functionality
- Booking details

## Features Implementation

### Real-Time Updates
- Socket.io connection in ExpertDetail component
- Joins expert-specific rooms for updates
- Updates slot availability without page refresh

### Form Validation
- Email format validation
- Phone number validation (10 digits)
- Required field checks
- Real-time validation feedback

### Navigation
- Single-page application with internal routing
- Back buttons for easy navigation
- Navigation bar with main routes

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| REACT_APP_API_URL | http://localhost:5000/api | Backend API URL |
| REACT_APP_SOCKET_URL | http://localhost:5000 | WebSocket server URL |

## API Integration

The app connects to these backend endpoints:

- `GET /experts` - Fetch experts list
- `GET /experts/:id` - Get expert details
- `POST /bookings` - Create booking
- `GET /bookings?email=` - Fetch user bookings
- `PATCH /bookings/:id/status` - Update booking status

## Styling

Global styles in `index.css` include:
- Responsive grid layout
- Loading spinner animation
- Status badges
- Form styling
- Card layouts
- Pagination controls
- Mobile-responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
