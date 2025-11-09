// src/pages/About.jsx
export default function About() {
  return (
    <div className="page-container">
      <h1>About CampusKart</h1>
      <p>Built with ❤️ by students, for students.</p>

      <div style={{ marginTop: "2rem", display: "grid", gap: "1.5rem" }}>
        {[
          {
            name: "Vatsal Nalavde",
            role: "Project Lead & Backend",
            quote: "Turning caffeine into scalable APIs since day one.",
          },
          {
            name: "Yogesh Rajpurohit",
            role: "Frontend Developer",
            quote: "If it’s not pixel-perfect, it’s not shipped.",
          },
          {
            name: "Jaimin Makhwana",
            role: "Backend Developer",
            quote: "Silent but deadly — like a perfectly optimized query.",
          },
        ].map((dev, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              background: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "#ddd",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              👨‍💻
            </div>
            <div>
              <h3>{dev.name}</h3>
              <p>
                <em>{dev.role}</em>
              </p>
              <p>“{dev.quote}”</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
