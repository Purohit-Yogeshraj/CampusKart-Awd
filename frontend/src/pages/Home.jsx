// src/pages/Home.jsx
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Welcome to <span>CampusKart</span>
          </h1>
          <p>
            Your one-stop shop for <span className="highlight">Buying</span> and
            <span className="highlight"> Selling</span> used items on campus.
          </p>
          <div className="b-s_btn">
            <button
              className="btn"
              onClick={() => (window.location.hash = "#buy")}
            >
              Buy
            </button>
            <button
              className="btn outline"
              onClick={() => (window.location.hash = "#sell")}
            >
              Sell
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div style={{ fontSize: "4rem" }}>🎓🛒</div>
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works-section" id="how-it-works">
        <div className="how-head">
          <h2>
            How <span>CampusKart</span> Works
          </h2>
          <p>Trade smart in just 3 simple steps</p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">
              <div style={{ fontSize: "3rem" }}>📷</div>
            </div>
            <div className="step-number">01</div>
            <div className="step-title">Post Your Item</div>
            <div className="step-desc">
              List your book, gadget, or anything in 60 seconds. Add photos,
              price, and location.
            </div>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <div style={{ fontSize: "3rem" }}>💬</div>
            </div>
            <div className="step-number">02</div>
            <div className="step-title">Chat with Buyer</div>
            <div className="step-desc">
              Get messages from interested students. Negotiate, ask questions,
              agree on deal.
            </div>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <div style={{ fontSize: "3rem" }}>🤝</div>
            </div>
            <div className="step-number">03</div>
            <div className="step-title">Meet & Exchange</div>
            <div className="step-desc">
              Meet safely on campus, inspect item, pay & collect. No shipping,
              no scams!
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="feature-section">
        <div className="feature-head">
          <h2>
            <span>Empowering Students</span> Through Smarter Trade
          </h2>
        </div>
        <div className="features">
          <div className="feature">
            <div className="feature-ico">
              <div style={{ fontSize: "3rem" }}>🏫</div>
            </div>
            <div className="feature-title">
              <h3>Built for Your Campus Life</h3>
            </div>
            <div className="feature-description">
              <p>
                Specifically designed for students, CampusKart makes trading
                within your campus community simple, reliable, and hassle-free.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-ico">
              <div style={{ fontSize: "3rem" }}>💰</div>
            </div>
            <div className="feature-title">
              <h3>Deals That Fit Your Budget</h3>
            </div>
            <div className="feature-description">
              <p>
                Get the things you need at student-friendly prices—affordable
                deals that make everyday campus life easier.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-ico">
              <div style={{ fontSize: "3rem" }}>⚡</div>
            </div>
            <div className="feature-title">
              <h3>Fast, Simple & Secure</h3>
            </div>
            <div className="feature-description">
              <p>
                From browsing to checkout, every step is quick and safe, so you
                can buy or sell with complete confidence.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-ico">
              <div style={{ fontSize: "3rem" }}>🌱</div>
            </div>
            <div className="feature-title">
              <h3>Reduce Waste, Reuse Resources</h3>
            </div>
            <div className="feature-description">
              <p>
                Promote sustainability on campus by giving pre-loved items a
                second chance—saving money while helping the environment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <div className="testimonial-head">
          <h2>
            What <span>Students</span> Are Saying
          </h2>
          <p>Real stories from your campus peers 🎓</p>
        </div>
        <div className="testimonials-grid">
          {[
            {
              name: "Ananya Sharma",
              dept: "CSE, 3rd Year",
              text: "I sold my old engineering books within 2 hours of posting! Got ₹800 — enough for two pizzas 🍕. CampusKart is genius!",
            },
            {
              name: "Rohan Mehta",
              dept: "ECE, 2nd Year",
              text: "Bought a DSLR camera for my photography club at half price. Seller was from my own hostel — safe and smooth deal!",
            },
            {
              name: "Priya Kapoor",
              dept: "BBA, 1st Year",
              text: "As a fresher, I saved over ₹3000 on textbooks. CampusKart helped me survive my first semester without going broke 😅",
            },
          ].map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="quote-icon">“</div>
              <div className="testimonial-text">{t.text}</div>
              <div className="student-info">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#ddd",
                    borderRadius: "50%",
                  }}
                ></div>
                <div className="student-details">
                  <div className="student-name">{t.name}</div>
                  <div className="student-dept">{t.dept}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developers */}
      <div className="developers-section" id="developers">
        <div className="dev-head">
          <h2>
            Meet the <span>Minds Behind CampusKart</span>
          </h2>
          <p>Built with ❤️ by your fellow students</p>
        </div>
        <div className="developers-grid">
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
            <div className="developer-card" key={i}>
              <div className="dev-img">
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "#ddd",
                    borderRadius: "50%",
                    margin: "0 auto 1rem",
                  }}
                ></div>
              </div>
              <div className="dev-name">{dev.name}</div>
              <div className="dev-role">{dev.role}</div>
              <div className="dev-quote">“{dev.quote}”</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
