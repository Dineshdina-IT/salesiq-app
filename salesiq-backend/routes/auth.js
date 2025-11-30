import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Settings from "../models/Settings.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, company } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      company,
    });

    await Settings.create({ userId: user._id });

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Account suspended/inactive" });
    }

    user.isOnline = true;
    user.lastSeen = new Date();
    await user.save();

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// LOGOUT
router.post("/logout", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.isOnline = false;
      user.lastSeen = new Date();
      await user.save();
    }

    return res.json({ success: true, message: "Logged out" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET CURRENT USER
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json({ success: true, user: user.toJSON() });
});

// REFRESH TOKEN
router.post("/refresh-token", protect, async (req, res) => {
  const user = await User.findById(req.user.id);
  const token = generateToken(user._id, user.role);

  return res.status(200).json({
    success: true,
    token,
    user: user.toJSON(),
  });
});

export default router;
