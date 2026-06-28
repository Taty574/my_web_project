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

/* ==========================================================================
   The Floral Boutique — Auth form validation
   Handles Sign In and Sign Up tab panels on contact.html. Validates fields
   and applies Bootstrap is-valid / is-invalid states. 
   ========================================================================== */

(function () {
  "use strict";

  if (!document.getElementById("siEmail")) return;

  // ---------- Helper ----------
  function setFieldState(field, isValid) {
    field.classList.remove("is-valid", "is-invalid");
    field.classList.add(isValid ? "is-valid" : "is-invalid");
  }

  function showAuthStatus(panelId, message, type) {
    const panel = document.getElementById(panelId);
    let statusBox = panel.querySelector(".auth-status");

    if (!statusBox) {
      statusBox = document.createElement("div");
      statusBox.className = "auth-status alert mt-3 mb-0";
      const btn = panel.querySelector(".btn");
      btn.insertAdjacentElement("beforebegin", statusBox);
    }

    statusBox.classList.remove("alert-success", "alert-danger", "d-none");
    statusBox.classList.add(type === "success" ? "alert-success" : "alert-danger");
    statusBox.textContent = message;
  }

  function clearAuthStatus(panelId) {
    const panel = document.getElementById(panelId);
    const statusBox = panel.querySelector(".auth-status");
    if (statusBox) statusBox.classList.add("d-none");
  }

  // ---------- Clear helpers ----------
  function clearFields(ids) {
    ids.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.classList.remove("is-valid", "is-invalid");
    });
  }

  // ---------- Clear on tab switch ----------
  const signinTab = document.getElementById("signin-tab");
  const signupTab = document.getElementById("signup-tab");

  if (signinTab) {
    signinTab.addEventListener("shown.bs.tab", function () {
      clearFields(["siEmail", "siPassword"]);
      clearAuthStatus("signinPanel");
    });
  }

  if (signupTab) {
    signupTab.addEventListener("shown.bs.tab", function () {
      clearFields(["suFirst", "suLast", "suEmail", "suPassword"]);
      clearAuthStatus("signupPanel");
    });
  }

  // ---------- Sign In validation ----------
  const signinBtn = document.querySelector("#signinPanel .btn");
  if (signinBtn) {
    signinBtn.addEventListener("click", function () {
      const email    = document.getElementById("siEmail");
      const password = document.getElementById("siPassword");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let valid = true;

      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        setFieldState(email, false);
        valid = false;
      } else {
        setFieldState(email, true);
      }

      if (!password.value.trim()) {
        setFieldState(password, false);
        valid = false;
      } else {
        setFieldState(password, true);
      }

      if (!valid) {
        showAuthStatus("signinPanel", "Please fix the highlighted fields before signing in.", "error");
        return;
      }

      showAuthStatus("signinPanel", "Welcome back! You have signed in successfully.", "success");

      setTimeout(function () {
        clearFields(["siEmail", "siPassword"]);
        document.getElementById("siEmail").value = "";
        document.getElementById("siPassword").value = "";
        clearAuthStatus("signinPanel");
      }, 3000);
    });
  }

  // ---------- Sign Up validation ----------
  const signupBtn = document.querySelector("#signupPanel .btn");
  if (signupBtn) {
    signupBtn.addEventListener("click", function () {
      const first    = document.getElementById("suFirst");
      const last     = document.getElementById("suLast");
      const email    = document.getElementById("suEmail");
      const password = document.getElementById("suPassword");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let valid = true;

      if (!first.value.trim()) {
        setFieldState(first, false);
        valid = false;
      } else {
        setFieldState(first, true);
      }

      if (!last.value.trim()) {
        setFieldState(last, false);
        valid = false;
      } else {
        setFieldState(last, true);
      }

      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        setFieldState(email, false);
        valid = false;
      } else {
        setFieldState(email, true);
      }

      if (password.value.length < 8) {
        setFieldState(password, false);
        valid = false;
      } else {
        setFieldState(password, true);
      }

      if (!valid) {
        showAuthStatus("signupPanel", "Please fix the highlighted fields before creating your account.", "error");
        return;
      }

      const firstName = first.value.trim();
      showAuthStatus("signupPanel", "Welcome, " + firstName + "! Your account has been created successfully.", "success");

      setTimeout(function () {
        clearFields(["suFirst", "suLast", "suEmail", "suPassword"]);
        ["suFirst", "suLast", "suEmail", "suPassword"].forEach(function (id) {
          document.getElementById(id).value = "";
        });
        clearAuthStatus("signupPanel");
      }, 3000);
    });
  }

  // ---------- Forgot Password ----------
  const forgotLink = document.querySelector("#signinPanel a[data-forgot]");
  if (forgotLink) {
    forgotLink.addEventListener("click", function (e) {
      e.preventDefault();
      const email = document.getElementById("siEmail");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        setFieldState(email, false);
        showAuthStatus("signinPanel", "Please enter your email address above to reset your password.", "error");
      } else {
        setFieldState(email, true);
        showAuthStatus(
          "signinPanel",
          "A password reset link has been sent to " + email.value.trim() + ". Please check your inbox.",
          "success"
        );
      }
    });
  }

  // ---------- Live clearing on input ----------
  ["siEmail", "siPassword", "suFirst", "suLast", "suEmail", "suPassword"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", function () {
        this.classList.remove("is-valid", "is-invalid");
      });
    }
  });

})();