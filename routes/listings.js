const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/uploads");
    if (!fs.existsSync(uploadPath))
      fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"), false);
    }
  },
});

// Get all listings (for buy.html)
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching listings" });
  }
});

// Post new listing
router.post("/", auth, upload.single("image"), async (req, res) => {
  const { title, category, price, phone, location, description } = req.body;

  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const listing = new Listing({
      user: req.user.id,
      title,
      category,
      price: parseFloat(price),
      phone,
      location,
      description,
      image_path: imagePath,
    });

    await listing.save();
    res.json({ success: true, message: "Ad posted successfully!" });
  } catch (err) {
    res.json({ success: false, message: "Failed to post ad" });
  }
});

// Update listing
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!listing) {
      return res.json({ success: false, message: "Access denied" });
    }

    // Delete old image if new one uploaded
    if (req.file) {
      const imagePath = `/uploads/${req.file.filename}`;
      if (
        listing.image_path &&
        fs.existsSync(`./public${listing.image_path}`)
      ) {
        fs.unlinkSync(`./public${listing.image_path}`);
      }
      req.body.image_path = imagePath;
    }

    await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Ad updated successfully" });
  } catch (err) {
    res.json({ success: false, message: "Update failed" });
  }
});

// Delete listing
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!listing) {
      return res.json({ success: false, message: "Access denied" });
    }

    // Delete image
    if (listing.image_path && fs.existsSync(`./public${listing.image_path}`)) {
      fs.unlinkSync(`./public${listing.image_path}`);
    }

    res.json({ success: true, message: "Ad deleted successfully" });
  } catch (err) {
    res.json({ success: false, message: "Deletion failed" });
  }
});

// Get user's listings (for sell.html)
router.get("/my", auth, async (req, res) => {
  try {
    const listings = await Listing.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(listings);
  } catch (err) {
    res.json({ success: false, message: "Error fetching your ads" });
  }
});

module.exports = router;
