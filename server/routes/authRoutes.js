import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 🔐 Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    console.log("🟢 Registering user:", { name, email, password });

    const existingUser = await User.findOne({ email });
    console.log("🟢 Existing user:", existingUser);

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User created", userId: newUser._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🔓 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;

