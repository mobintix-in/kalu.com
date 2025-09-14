// Mobile menu toggle
document.querySelector(".mobile-menu-btn").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  const isClickInsideNav = event.target.closest("nav");
  const isClickInsideMenuBtn = event.target.closest(".mobile-menu-btn");
  if (!isClickInsideNav && !isClickInsideMenuBtn) {
    document.querySelector(".nav-links").classList.remove("active");
  }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
      document.querySelector(".nav-links").classList.remove("active");
    }
  });
});

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Force Forest theme
document.documentElement.setAttribute("data-theme", "forest");

// Form validation
const form = document.getElementById("consultForm");
const showError = (id, show) => {
  const input = document.getElementById(id);
  const error = document.querySelector(`.error-text[data-error-for="${id}"]`);
  if (!input || !error) return;
  input.classList.toggle("is-invalid", show);
  error.style.display = show ? "block" : "none";
};
const isEmail = (v) => /.+@.+\..+/.test(v);
const isPhone = (v) => /[0-9+()\-\s]{7,}/.test(v);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  const values = {
    fullName: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    service: document.getElementById("service").value,
    message: document.getElementById("message").value.trim(),
  };
  showError("fullName", values.fullName.length < 2);
  if (values.fullName.length < 2) valid = false;
  showError("email", !isEmail(values.email));
  if (!isEmail(values.email)) valid = false;
  showError("phone", !isPhone(values.phone));
  if (!isPhone(values.phone)) valid = false;
  showError("service", values.service === "");
  if (values.service === "") valid = false;
  showError("message", values.message.length < 10);
  if (values.message.length < 10) valid = false;

  if (!valid) return;
  alert("Thank you. Your request has been received. We will contact you shortly.");
  form.reset();
});

// FAQ toggle
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".faq-item").classList.toggle("active");
  });
});

// Back to top
const backBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});
backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
