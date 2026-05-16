# Car Web Application

A full-stack web platform that connects car buyers with an admin-managed vehicle showroom.

## Features

- Browse, search, and filter car listings by brand, model, price, and year
- View detailed car pages with image galleries, specs, and user reviews
- Submit purchase requests on available vehicles (authenticated buyers)
- Track all your submitted requests with live status updates via the Registration widget
- Leave star ratings and written reviews on any car listing
- Admin control panel for full inventory management (add, edit, delete cars)
- Secure JWT authentication with role-based access (buyer / admin)
- User profile management with photo upload and password update

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v7 |
| Backend | Node.js, Express.js 5 |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| File Uploads | Multer |

---

## Project Structure

```
Car-Web-Application/
├── src/
│   ├── server.js            # Entry point
│   ├── config/              # DB connection
│   ├── controllers/         # Business logic
│   ├── models/              # Mongoose schemas (User, Car, Request, Feedback)
│   ├── routes/              # API route definitions
│   └── middleWares/         # Auth + upload middleware
├── front/                   # React frontend
│   └── src/
│       ├── pages/           # Page components
│       └── components/      # Reusable components (CarCard, Registration)
├── uploads/                 # Stored images
└── .env                     # Environment variables (not committed)
```

---

## Installation & Setup

### Prerequisites

- Node.js v18+
- MongoDB (local) or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone https://github.com/WafaaAtef/Car-Web-Application.git
cd Car-Web-Application
```

### 2. Configure environment variables

Create a `.env` file in the root of the project:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Install backend dependencies

```bash
npm install
```

### 4. Start the backend server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000`.

### 5. Install and start the frontend

```bash
cd front
npm install
npm start
```

The React app will open at `http://localhost:3000`.

---

## API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/signup | No | Register a new user |
| POST | /api/auth/signin | No | Login and receive JWT cookie |
| GET | /api/cars | No | List all cars (supports search & sort) |
| GET | /api/cars/:id | No | Get a single car by ID |
| POST | /api/cars | Admin | Add a new car listing |
| PUT | /api/cars/:id | Admin | Update a car listing |
| DELETE | /api/cars/:id | Admin | Delete a car listing |
| GET | /api/user | Auth | Get current user profile |
| PATCH | /api/user | Auth | Update profile info |
| PATCH | /api/user/password | Auth | Update password |
| PATCH | /api/user/profile-image | Auth | Upload profile photo |
| GET | /api/user/logout | Auth | Logout and clear cookie |
| POST | /api/requests | Auth | Submit a purchase request |
| GET | /api/requests/my | Auth | Get all requests for logged-in buyer |
| POST | /api/feedback | No | Submit a car review |
| GET | /api/feedback/:carId | No | Get all reviews for a specific car |

Full API documentation with request/response examples is available in the included Postman collection (`car-api.postman_collection.json`).

---

## Current Status

| Module | Status |
|--------|--------|
| Backend API | Complete |
| Car browsing & search | Complete |
| Admin dashboard | Complete |
| Profile management | Complete |
| Car reviews & feedback | Complete |
| Registration tracker widget | Complete |
| Login / Register UI | In progress |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a pull request

---

## License

ISC
