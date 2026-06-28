/* ==========================================================================
   The Floral Boutique — Contact form validation
   Used on contact.html. Validates name, email, inquiry type, and
   message length, then shows a success banner (no real backend — this is
   a front-end demo of form handling per the assignment brief).
   ========================================================================== */

(function () {
  "use strict";

  const form = document.getElementById("consultationForm");
  if (!form) return;

  const statusBox = document.getElementById("formStatus");

  function showStatus(message, type) {
    statusBox.textContent = message;
    statusBox.classList.remove("d-none", "alert-success", "alert-danger");
    statusBox.classList.add(type === "success" ? "alert-success" : "alert-danger");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const isValid = form.checkValidity();
    form.classList.add("was-validated");

    if (!isValid) {
      showStatus("Please fix the highlighted fields before submitting.", "error");
      return;
    }

    const name = document.getElementById("clientName").value.trim();
    showStatus(
      "Thank you, " + name + "! Your consultation brief has been received. We'll reply within one business day.",
      "success"
    );

    form.reset();
    form.classList.remove("was-validated");
  });
})();