// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <div className="footer-logo">CampusKart</div>
          <p className="footer-tagline">
            Empowering students to buy, sell & reuse — right on campus.
          </p>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#buy">Buy</a>
            </li>
            <li>
              <a href="#sell">Sell</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li>
              <i className="fas fa-map-marker-alt"></i> CampusKart Inc., Surat.
            </li>
            <li>
              <i className="fas fa-envelope"></i> contact@campuskart.edu
            </li>
            <li>
              <i className="fas fa-phone"></i> +91 98765 43210
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Stay Updated</h4>
          <p>Get notified about new listings & campus deals.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" required />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2025 CampusKart. Built with ❤️ by Students, for Students. |
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a>
        </p>
      </div>
    </footer>
  );
}
