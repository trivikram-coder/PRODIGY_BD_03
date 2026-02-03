User CRUD API (In-Memory)
📌 Overview

This project is a simple REST API that performs basic CRUD (Create, Read, Update, Delete) operations on a User resource using in-memory storage (HashMap-style object).

No database is used. Data exists only while the server is running.

✨ Features

Create a user

Get all users

Get a user by ID

Update user details (partial updates supported)

Delete a user

Email format validation

Email uniqueness check

Proper HTTP status codes and error handling

🧱 User Model

Each user contains:

id (UUID)

name (string)

email (string)

age (number)

🛠 Tech Stack

Node.js

Express.js

In-memory HashMap (JavaScript Object)

UUID

Swagger (API Documentation)

🚀 Running the Application

Install dependencies

Start the server

Open Swagger UI to test APIs

⚠️ Note: Data is stored in memory and will be lost on server restart.

📚 API Endpoints
Method	Endpoint	Description
POST	/users	Create a new user
GET	/users	Get all users
GET	/users/{id}	Get user by ID
PATCH	/users/{id}	Update user details
DELETE	/users/{id}	Delete user
📥 GET /users – Get All Users
Description

Returns a list of all users stored in memory.

Response

200 OK → List of users

200 OK (empty list) → If no users exist

Example Response
[
  {
    "id": "uuid-1",
    "name": "John",
    "email": "john@gmail.com",
    "age": 25
  },
  {
    "id": "uuid-2",
    "name": "Alice",
    "email": "alice@gmail.com",
    "age": 22
  }
]

🧪 Validation & Error Handling

Invalid email format → 400 Bad Request

Duplicate email → 400 Bad Request

User not found → 404 Not Found

Successful delete → 204 No Content

📝 Notes

Uses in-memory hashmap for storage

Focused only on User CRUD

No authentication or authorization

Designed for interview and learning purposes

📄 License

Educational use only.

🔹 GET /users – Minimal Method (for understanding)
app.get('/users', (req, res) => {
  res.status(200).json(Object.values(users));
});
