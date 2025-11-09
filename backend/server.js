// backend/server.js
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db();
    console.log("✅ Connected to MongoDB");
  } catch (e) {
    console.error("❌ MongoDB connection failed:", e);
  }
}

connectDB();

// 👇 API Routes Below

// 🟢 GET all listings
app.get("/api/listings", async (req, res) => {
  try {
    const listings = await db.collection("listings").find().toArray();
    res.json({ success: true, data: listings });
  } catch (e) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🔵 GET user's listings (protected)
app.get("/api/my-listings", async (req, res) => {
  const userId = req.headers["user-id"]; // We'll send user ID from frontend
  if (!userId)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const listings = await db
      .collection("listings")
      .find({ user_id: userId })
      .toArray();
    res.json({ success: true, data: listings });
  } catch (e) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🟡 POST new listing
app.post("/api/listings", async (req, res) => {
  const { title, category, price, phone, location, description, user_id } =
    req.body;

  if (
    !title ||
    !category ||
    !price ||
    !phone ||
    !location ||
    !description ||
    !user_id
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  try {
    const result = await db.collection("listings").insertOne({
      title,
      category,
      price: parseFloat(price),
      phone,
      location,
      description,
      user_id,
      posted_at: new Date(),
      image: null, // We won’t handle image upload for simplicity (you can add later)
    });
    res.json({
      success: true,
      message: "Posted successfully!",
      id: result.insertedId,
    });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to post" });
  }
});

// 🔴 DELETE listing
app.delete("/api/listings/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.headers["user-id"];

  try {
    const result = await db.collection("listings").deleteOne({
      _id: new ObjectId(id),
      user_id: userId,
    });

    if (result.deletedCount === 1) {
      res.json({ success: true, message: "Deleted successfully" });
    } else {
      res
        .status(403)
        .json({ success: false, message: "Not authorized or not found" });
    }
  } catch (e) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

// 🔵 Signup
app.post("/api/signup", async (req, res) => {
  const { username, gender, dob, email, contact, password } = req.body;

  if (!username || !gender || !dob || !email || !contact || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  try {
    const existing = await db.collection("users").findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const result = await db.collection("users").insertOne({
      username,
      gender,
      dob,
      email,
      contact,
      password, // ⚠️ In real app: hash it (bcrypt), but for demo: plain
      created_at: new Date(),
    });

    res.json({
      success: true,
      message: "Signup successful!",
      user_id: result.insertedId,
    });
  } catch (e) {
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

// 🔵 Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email, password }); // again: plain password
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
