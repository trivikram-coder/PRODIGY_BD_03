const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  register,
  login,
  updateUserByEmail,
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserById,
  deleteUserById
} = require("../controller/authController");

const router = express.Router();

// 🔓 Auth routes
router.post("/register", register);
router.post("/login", login);

// 👤 Current user routes
router.get("/users/me", verifyToken, getCurrentUser);
router.put("/users/me", verifyToken, updateUserByEmail);

// 👑 Admin / management routes
router.get("/users", verifyToken, getUsers);

// 🆔 User by ID (keep LAST)
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUserById);
router.delete("/users/:id", verifyToken, deleteUserById);

module.exports = router;
