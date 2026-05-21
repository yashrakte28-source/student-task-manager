# Student Task Manager

A production-ready full-stack task management application with JWT authentication, role-based access control, real-time WebSocket notifications, and a connected frontend dashboard.

**Live Demo:** https://student-task-manager-braf.onrender.com  
**GitHub:** https://github.com/yashrakte28-source/student-task-manager

---

## Features

- User registration and login with JWT authentication
- Role-based access control — admin and user roles
- Full CRUD operations for task management
- Real-time live activity feed using Socket.io WebSockets
- Input validation and request sanitization middleware
- Password hashing with bcryptjs
- Admin dashboard — view all users, all tasks, system stats, delete users
- Frontend dashboard connected to the backend API
- Deployed on Render with MongoDB Atlas

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Socket.io | Real-time WebSocket communication |
| Render | Cloud deployment |
| MongoDB Atlas | Cloud database |

---

## Project Structure

```
student-task-manager/
├── public/
│   └── index.html                  # Frontend dashboard
├── src/
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Register, Login, Profile
│   │   └── taskController.js       # CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   ├── roleMiddleware.js       # Role-based access control
│   │   └── validationMiddleware.js # Input validation
│   ├── models/
│   │   ├── User.js                 # User schema with role field
│   │   └── Task.js                 # Task schema
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── taskRoutes.js           # Task endpoints
│   │   └── adminRoutes.js          # Admin-only endpoints
│   └── index.js                    # Entry point + Socket.io setup
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/yashrakte28-source/student-task-manager.git
cd student-task-manager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student-task-manager
JWT_SECRET=your_secret_key_here
```

### 4. Run the server
```bash
# Development
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5000`

---

## API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |
| GET | `/api/auth/me` | Get current user profile | Yes |

### Tasks — `/api/tasks`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks for logged-in user | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

### Admin — `/api/admin` (Admin role required)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/stats` | System statistics | Admin |
| GET | `/api/admin/users` | Get all users | Admin |
| GET | `/api/admin/tasks` | Get all tasks from all users | Admin |
| DELETE | `/api/admin/users/:id` | Delete a user and their tasks | Admin |

---

## Authentication Flow

1. User registers — password hashed with bcrypt and saved in MongoDB
2. User logs in — password compared with stored hash
3. On success — JWT token issued (expires in 30 days)
4. Protected routes require: `Authorization: Bearer <token>`
5. Middleware verifies token on every request
6. Role middleware checks `user.role` before allowing admin routes

---

## Role-Based Access Control

**USER role:**
- Register and login
- View own profile
- Create, read, update, delete own tasks only
- Cannot access `/api/admin` routes

**ADMIN role:**
- Everything a user can do
- View all users in the system
- View all tasks from all users
- Delete any user and their tasks
- View system statistics

---

## Real-Time WebSocket Events

| Event | Trigger | Description |
|-------|---------|-------------|
| `task:created` | POST /api/tasks | Broadcasts new task to all connected clients |
| `user:registered` | POST /api/auth/register | Notifies when new user registers |
| `user:loggedin` | POST /api/auth/login | Notifies when user logs in |

---

## API Examples

### Register User
```json
POST /api/auth/register
{
  "name": "Yash Rakte",
  "email": "yash@example.com",
  "password": "password123",
  "role": "user"
}
```

### Register Admin
```json
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "yash@example.com",
  "password": "password123"
}
```

### Create Task
```json
POST /api/tasks
Authorization: Bearer <token>
{
  "title": "Complete DSA Assignment",
  "description": "Solve 5 problems on arrays",
  "subject": "Data Structures",
  "priority": "high",
  "status": "pending",
  "dueDate": "2026-06-01"
}
```

### Admin Stats Response
```json
GET /api/admin/stats
Authorization: Bearer <admin_token>

{
  "success": true,
  "data": {
    "totalUsers": 10,
    "totalTasks": 45,
    "completedTasks": 20,
    "pendingTasks": 15,
    "inProgressTasks": 10
  }
}
```

---

## Validation Rules

| Field | Rule |
|-------|------|
| name | Minimum 2 characters |
| email | Must be valid email format |
| password | Minimum 6 characters |
| task title | Minimum 2 characters, trimmed |

---

## Deployment

Deployed on Render with MongoDB Atlas:

1. Push code to GitHub
2. Connect GitHub repo to Render as a Web Service
3. Set environment variables on Render dashboard:
   - `MONGO_URI` — MongoDB Atlas connection string
   - `JWT_SECRET` — Secret key for JWT signing
   - `PORT` — 5000
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Deploy — live URL generated automatically

---

## Author

**Yash Rakte**  
B.Sc. Computer Science | RBNB College, Shrirampur  
Email: yashrakte28@gmail.com  
GitHub: https://github.com/yashrakte28-source