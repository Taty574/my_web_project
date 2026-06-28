/* ==========================================================================
   The Floral Boutique — Boutique page filter
   Lets visitors filter the product grid by category using the pill buttons.
   Pure DOM filtering, no external dependencies.
   ========================================================================== */

(function () {
  "use strict";

  const buttons = document.querySelectorAll("#filterControls .filter-btn");
  const cards = document.querySelectorAll("#productGrid .product-card");
  const noResults = document.getElementById("noResults");

  if (!buttons.length || !cards.length) return;

  function applyFilter(category) {
    let visibleCount = 0;

    cards.forEach(function (card) {
      const matches = category === "all" || card.getAttribute("data-category") === category;
      card.classList.toggle("fb-hidden", !matches);
      if (matches) visibleCount++;
    });

    if (noResults) {
      noResults.classList.toggle("d-none", visibleCount > 0);
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });
})();