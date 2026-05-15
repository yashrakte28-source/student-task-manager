# 📚 Student Task Manager API

A RESTful API for managing student academic tasks, built with Node.js, Express, and MongoDB. Features JWT-based authentication and full CRUD operations.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Testing:** Postman

## 📁 Project Structure

```
student-task-manager/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Register, Login, Profile
│   │   └── taskController.js  # CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── taskRoutes.js      # Task endpoints
│   └── index.js               # Entry point
├── .env.example
├── .gitignore
└── package.json
```

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/yashrakte/student-task-manager.git
cd student-task-manager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` with your values:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/student-task-manager
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### 4. Run the server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5000`

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user profile | Yes |

### Task Routes — `/api/tasks`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks (supports `?status=` & `?priority=` filters) | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| POST | `/api/tasks` | Create a task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

---

## 📬 Postman Examples

### Register
```json
POST /api/auth/register
{
  "name": "Yash Rakte",
  "email": "yash@example.com",
  "password": "password123"
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
> Copy the `token` from the response and use it as `Bearer <token>` in the Authorization header for all protected routes.

### Create Task
```json
POST /api/tasks
Authorization: Bearer <your_token>
{
  "title": "Complete DSA Assignment",
  "description": "Solve 5 problems on arrays and strings",
  "subject": "Data Structures",
  "dueDate": "2024-12-31",
  "priority": "high",
  "status": "pending"
}
```

### Update Task
```json
PUT /api/tasks/:id
Authorization: Bearer <your_token>
{
  "status": "completed"
}
```

---

## 🔐 Authentication Flow

1. User registers → password is **hashed with bcrypt** before saving to DB
2. User logs in → password is compared with hash
3. On success → a **JWT token** is issued (expires in 7 days)
4. All protected routes require `Authorization: Bearer <token>` header
5. Middleware verifies and decodes the token on every protected request

---

## 🌐 Deployment

This API is deployed on **Render**: `https://student-task-manager.onrender.com`

---

## 📌 Features

- ✅ User registration and login
- ✅ Secure password hashing (bcryptjs)
- ✅ JWT authentication with middleware protection
- ✅ Full CRUD for tasks (Create, Read, Update, Delete)
- ✅ Task filtering by status and priority
- ✅ User-scoped data (users can only access their own tasks)
- ✅ Proper error handling and HTTP status codes
- ✅ Clean MVC architecture (Models, Controllers, Routes)

---

## 👨‍💻 Author

**Yash Rakte**  
B.Sc. Computer Science | RBNB College, Shrirampur  
📧 yashrakte28@gmail.com  
🐙 [github.com/yashrakte](https://github.com/yashrakte)
