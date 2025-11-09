// src/components/Navbar.jsx
export default function Navbar({ user, onLogout }) {
  const navigate = (page) => {
    window.location.hash = `#${page}`;
    window.location.reload(); // simple reload for demo
  };

  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => navigate("home")}
        style={{ cursor: "pointer" }}
      >
        CampusKart
      </div>

      <ul className="nav-links">
        <li>
          <button className="nav-link" onClick={() => navigate("home")}>
            Home
          </button>
        </li>
        <li>
          <button className="nav-link" onClick={() => navigate("buy")}>
            Buy
          </button>
        </li>
        <li>
          <button className="nav-link" onClick={() => navigate("sell")}>
            Sell
          </button>
        </li>
        <li>
          <button className="nav-link" onClick={() => navigate("about")}>
            About Us
          </button>
        </li>
      </ul>

      <div className="auth-buttons">
        {user ? (
          <>
            <span style={{ color: "#555" }}>Hi, {user.username}</span>
            <button className="btn-login-signup secondary" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn-login-signup" onClick={() => navigate("auth")}>
            Login/Sign Up
          </button>
        )}
      </div>
    </nav>
  );
}
