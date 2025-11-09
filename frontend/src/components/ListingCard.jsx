// src/components/ListingCard.jsx
export default function ListingCard({ item }) {
  return (
    <div className="listing-card">
      <div className="listing-img">
        {item.category === "Books" && "📚"}
        {item.category === "Electronics" && "💻"}
        {item.category === "Furniture" && "🛏️"}
        {item.category === "Clothing" && "👕"}
        {item.category === "Others" && "📦"}
        &nbsp;{item.title}
      </div>
      <div className="listing-body">
        <div className="listing-title">{item.title}</div>
        <div className="listing-price">₹{item.price}</div>
        <div className="listing-meta">
          <span>{item.user_name || "Anonymous"}</span>
          <span>{new Date(item.posted_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
