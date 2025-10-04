// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, gender, dob, email, contact, pass1, pass2 } = req.body;

    // 🔸 Validation
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
        .json({ success: false, message: "Phone must be 10 digits" });
    }

    // 🔸 Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    // 🔸 Hash password
    const hashedPassword = await bcrypt.hash(pass1, 12);

    // 🔸 Create user
    const user = new User({
      username,
      gender,
      dob: new Date(dob), // Ensure it's a Date object
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
    // 🔸 Send specific error for debugging
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
      error: err.message, // 👈 Remove this in production!
    });
  }
});

module.exports = router;
