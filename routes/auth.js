const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { username, gender, dob, email, contact, pass1, pass2 } = req.body;

    // Validation
    if (
      !username ||
      !gender ||
      !dob ||
      !email ||
      !contact ||
      !pass1 ||
      !pass2
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (pass1 !== pass2) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    if (!/^[0-9]{10}$/.test(contact)) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number must be 10 digits" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(pass1, 12);

    // Create new user
    const user = new User({
      username,
      gender,
      dob: new Date(dob),
      email,
      contact,
      password: hashedPassword,
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "Registration successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Registration failed. Please try again.",
      });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    res.json({
      success: true,
      message: "Login successful!",
      username: user.username,
    });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ success: false, message: "Login failed. Please try again." });
  }
});

module.exports = router;
