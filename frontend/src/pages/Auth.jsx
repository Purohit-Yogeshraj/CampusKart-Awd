// src/pages/Auth.jsx
import React, { useState } from "react";

export default function Auth({ onLogin, setPage }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          onLogin(data.user);
        } else {
          alert("❌ " + data.message);
        }
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        gender,
        dob,
        email,
        contact,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          alert("✅ Signup successful! Please login.");
          setIsLogin(true);
        } else {
          alert("❌ " + data.message);
        }
      });
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "3rem auto",
        padding: "1.5rem",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <button
          className={`btn`}
          style={{ flex: 1, background: isLogin ? "#2b84ea" : "#ccc" }}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`btn`}
          style={{ flex: 1, background: !isLogin ? "#2b84ea" : "#ccc" }}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              margin: "0.5rem 0",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Password"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              margin: "0.5rem 0",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ width: "100%", marginTop: "1rem" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              margin: "0.5rem 0",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />

          <div style={{ display: "flex", gap: "1rem", margin: "0.5rem 0" }}>
            {["male", "female", "other"].map((g) => (
              <label key={g} style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={() => setGender(g)}
                  required
                  style={{ marginRight: "0.5rem" }}
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              margin: "0.5rem 0",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              margin: "0.5rem 0",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact (10 digits)"
            pattern="[0-9]{10}"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              margin: "0.5rem 0",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6)"
            minLength="6"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              margin: "0.5rem 0",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              margin: "0.5rem 0",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />

          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ width: "100%", marginTop: "1rem" }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      )}

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          onClick={() => setPage("home")}
          style={{
            background: "none",
            border: "none",
            color: "#2b84ea",
            cursor: "pointer",
          }}
        >
          ← Back to Home
        </button>
      </p>
    </div>
  );
}
