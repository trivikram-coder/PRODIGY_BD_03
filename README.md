📌 Overview

This project is a RESTful API that implements JWT-based authentication and role-based authorization for secure access control.

The API allows users to register and log in, generates JSON Web Tokens (JWT), and restricts access to specific endpoints based on user roles such as Admin and User.

This project focuses on authentication, authorization, and backend security fundamentals.

✨ Features

User registration and login

JWT-based authentication

Role-based access control (Admin / User)

Protected routes using middleware

Secure password handling

Proper HTTP status codes and error handling

🧱 User Model

Each user contains:

id (MongoDB ObjectId)

name (string)

email (string, unique)

password (string, hashed)

role (string: admin / user)

🛠 Tech Stack

Node.js

Express.js

MongoDB

Mongoose

JSON Web Token (JWT)

bcrypt

🔐 Authentication & Authorization Flow

User registers with email and password

Password is hashed and stored securely

User logs in and receives a JWT

JWT is sent in request headers

Middleware verifies token validity

Role-based middleware checks user permissions

🚀 Running the Application

Install dependencies

npm install


Configure environment variables

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key


Start the server

npm start

📚 API Endpoints
Auth Routes

POST /auth/register → Register a new user

POST /auth/login → Login and receive JWT

Protected Routes

GET /users → Accessible by Admin only

DELETE /users/:id → Admin only

GET /profile → Authenticated users

🧪 Error Handling

Invalid credentials → 401 Unauthorized

Missing or invalid token → 401 Unauthorized

Access denied (role-based) → 403 Forbidden

User not found → 404 Not Found

📝 Notes

No Swagger documentation used

No crypto module used

Focused on JWT and role-based authorization

Designed for internship and interview preparation

📄 License

Educational use only.