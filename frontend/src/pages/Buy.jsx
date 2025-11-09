// src/pages/Buy.jsx
import React, { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";

export default function Buy() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/listings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Mock user names for demo
          const withNames = data.data.map((item, i) => ({
            ...item,
            user_name: [
              "Ananya",
              "Rohan",
              "Priya",
              "Vatsal",
              "Jaimin",
              "Yogesh",
            ][i % 6],
          }));
          setListings(withNames);
        }
        setLoading(false);
      });
  }, []);

  const filtered = listings.filter(
    (item) =>
      (item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())) &&
      (category === "" || item.category === category)
  );

  if (loading)
    return (
      <div className="page-container">
        <p>Loading listings...</p>
      </div>
    );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Browse Campus Listings</h1>
        <p>Find books, gadgets, furniture & more from students like you</p>
      </div>

      <div className="filters">
        <input
          type="text"
          className="filter-input"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Books</option>
          <option>Electronics</option>
          <option>Furniture</option>
          <option>Clothing</option>
          <option>Others</option>
        </select>
        <button className="btn-search">Search</button>
      </div>

      <div className="listings-grid">
        {filtered.length === 0 ? (
          <p>No listings found. Try changing filters.</p>
        ) : (
          filtered.map((item) => <ListingCard key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}
