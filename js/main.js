(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  const THEME_KEY = "fb-theme";
  const root = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");

  function applyTheme(theme) {
    root.setAttribute("data-bs-theme", theme);
    if (toggleBtn) {
      toggleBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    }
  }

  // On load: respect a saved choice for this browser session only
  // (no persistent localStorage dependency required, but we use it
  // if available so the toggle feels "sticky" across page navigation)
  let savedTheme = "light";
  try {
    savedTheme = sessionStorage.getItem(THEME_KEY) || "light";
  } catch (e) {
    savedTheme = "light";
  }
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const current = root.getAttribute("data-bs-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        sessionStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* sessionStorage unavailable — theme just won't persist across pages */
      }
    });
  }

  /* ---------- Footer year ---------- */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();