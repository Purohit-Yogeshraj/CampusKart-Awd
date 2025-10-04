document.addEventListener("DOMContentLoaded", function () {
  // ============ TOGGLE BETWEEN LOGIN & SIGNUP ============
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const authForms = document.querySelectorAll(".auth-form");

  // Set initial active state
  document.getElementById("login-form").classList.add("active");
  document.querySelector('[data-target="login"]').classList.add("active");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all
      toggleButtons.forEach((btn) => btn.classList.remove("active"));
      authForms.forEach((form) => form.classList.remove("active"));

      // Add active to clicked button and target form
      button.classList.add("active");
      const target = button.getAttribute("data-target");
      document.getElementById(`${target}-form`).classList.add("active");
    });
  });

  // ============ LOGIN FORM SUBMISSION ============
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, pass: password }),
        });
        const data = await res.json();

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          alert(data.message);
          window.location.href = "index.html";
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert("Something went wrong. Please try again.");
      }
    });
  }

  // ============ SIGNUP FORM SUBMISSION ============
  const signupForm = document.getElementById("signup-form-full");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("signup-name").value.trim();
      const gender = document.querySelector(
        'input[name="gender"]:checked'
      )?.value;
      const dob = document.getElementById("signup-dob").value;
      const email = document.getElementById("signup-email").value.trim();
      const contact = document.getElementById("signup-phone").value.trim();
      const pass1 = document.getElementById("signup-password").value;
      const pass2 = document.getElementById("signup-confirm-password").value;

      // Validation
      if (
        !username ||
        !gender ||
        !dob ||
        !email ||
        !contact ||
        !pass1 ||
        !pass2
      ) {
        alert("Please fill all fields.");
        return;
      }

      if (pass1 !== pass2) {
        alert("Passwords do not match.");
        return;
      }

      if (!/^[0-9]{10}$/.test(contact)) {
        alert("Phone number must be 10 digits.");
        return;
      }

      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            gender,
            dob,
            email,
            contact,
            pass1,
            pass2,
          }),
        });
        const data = await res.json();

        alert(data.message);
        if (data.success) {
          // Reset form
          signupForm.reset();
          // Switch to login
          toggleButtons.forEach((btn) => btn.classList.remove("active"));
          authForms.forEach((form) => form.classList.remove("active"));
          document
            .querySelector('[data-target="login"]')
            .classList.add("active");
          document.getElementById("login-form").classList.add("active");
        }
      } catch (err) {
        alert("Registration failed. Please try again.");
      }
    });
  }
});
