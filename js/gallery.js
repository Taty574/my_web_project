/* ==========================================================================
   The Floral Boutique — Gallery lightbox
   Clicking a thumbnail opens it full-size in a Bootstrap modal, with its
   caption. The carousel above needs no extra JS — Bootstrap's bundle
   handles that automatically via data-bs-* attributes.
   ========================================================================== */

(function () {
  "use strict";

  const thumbs = document.querySelectorAll(".gallery-thumb");
  const modalEl = document.getElementById("lightboxModal");
  if (!thumbs.length || !modalEl) return;

  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const modal = new bootstrap.Modal(modalEl);

  thumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      const fullImg = thumb.getAttribute("data-img");
      const caption = thumb.getAttribute("data-caption") || "";

      lightboxImage.setAttribute("src", fullImg);
      lightboxImage.setAttribute("alt", caption);
      lightboxCaption.textContent = caption;

      modal.show();
    });
  });
})();