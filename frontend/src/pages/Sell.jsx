// src/pages/Sell.jsx
import React, { useState, useEffect } from "react";

export default function Sell({ user }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/my-listings`, {
      headers: { "user-id": user.id },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setListings(data.data);
      });
  }, [user.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:5000/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category,
        price,
        phone,
        location,
        description,
        user_id: user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          alert("✅ Posted successfully!");
          setTitle("");
          setCategory("");
          setPrice("");
          setPhone("");
          setLocation("");
          setDescription("");
          // Refresh
          fetch(`http://localhost:5000/api/my-listings`, {
            headers: { "user-id": user.id },
          })
            .then((r) => r.json())
            .then((d) => d.success && setListings(d.data));
        } else {
          alert("❌ " + data.message);
        }
      });
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this listing?")) return;
    fetch(`http://localhost:5000/api/listings/${id}`, {
      method: "DELETE",
      headers: { "user-id": user.id },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setListings(listings.filter((l) => l._id !== id));
          alert("Deleted!");
        } else {
          alert("❌ " + data.message);
        }
      });
  };

  return (
    <div className="page-container">
      <div className="sell-form">
        <h2 className="form-header">Post a New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Physics Textbook"
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option>Books</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Clothing</option>
              <option>Others</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 500"
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label>Your Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Hostel A, Block 3"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe condition, reason for selling, etc."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Posting..." : "Post Ad"}
          </button>
        </form>
      </div>

      <div className="my-ads-section">
        <h2 className="my-ads-header">Your Posted Ads</h2>
        {listings.length === 0 ? (
          <p style={{ textAlign: "center", color: "#7f8c8d" }}>
            You haven't posted any ads yet.
          </p>
        ) : (
          <div className="my-listings-grid">
            {listings.map((ad) => (
              <div className="my-ad-card" key={ad._id}>
                <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {ad.title}
                </div>
                <div>
                  ₹{ad.price} | {ad.category}
                </div>
                <div>
                  📞 {ad.phone} | 📍 {ad.location}
                </div>
                <div className="ad-actions">
                  <button
                    className="ad-btn edit-btn"
                    onClick={() => alert("Edit coming soon!")}
                  >
                    Edit
                  </button>
                  <button
                    className="ad-btn delete-btn"
                    onClick={() => handleDelete(ad._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
