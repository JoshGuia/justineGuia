const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") body.classList.add("light");

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("portfolio-theme", body.classList.contains("light") ? "light" : "dark");
});

menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

const heatmap = document.getElementById("heatmap");
const total = 52 * 7;
for (let i = 0; i < total; i++) {
  const cell = document.createElement("i");
  const wave = Math.sin(i * 0.31) + Math.sin(i * 0.073) * 0.8;
  let level = 0;
  if (wave > 1.15) level = 4;
  else if (wave > 0.55) level = 3;
  else if (wave > -0.05) level = 2;
  else if (wave > -0.6) level = 1;
  if (Math.random() < 0.14) level = 0;
  cell.dataset.level = level;
  heatmap.appendChild(cell);
}

const revealItems = document.querySelectorAll(".project, .panel, .activity-card, .contact-links, .resume-inner");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealItems.forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});
