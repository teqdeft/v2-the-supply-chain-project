// ======= Provider join forms → Google Apps Script =======
// Shared by join-network-logistics-provider.html, logistics-tscp.html,
// join-network-technology-provider.html and join-network-professional-provider.html.
// The user is redirected to REDIRECT_URL only after the data is stored;
// the "page" field records which page the submission came from.
(function () {
  var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzxFXCGIwCgk85eoy63Xy4jbv7TUsqb1Cz5UDZvWsOQfVUDDQPcEXgYFu-_LLHtXNn4/exec";
  var REDIRECT_URL = "https://app.thesupplychainproject.org";

  var form =
    document.getElementById("logisticsProviderForm") ||
    document.getElementById("technologyProviderForm") ||
    document.getElementById("professionalProviderForm");
  if (!form) return;
  var btn = form.querySelector('button[type="submit"]');
  var status = form.querySelector(".form-status-msg");

  function show(msg, ok) {
    status.textContent = msg;
    status.style.display = "block";
    status.style.color = ok ? "var(--primary)" : "#b91c1c";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // --- validation ---
    var required = ["firstName", "lastName", "mainPhone", "mobilePhone", "email"].filter(
      function (name) { return form.elements[name]; }
    );
    var missing = false;
    required.forEach(function (name) {
      var el = form.elements[name];
      if (!el.value.trim()) {
        el.style.borderColor = "#b91c1c";
        missing = true;
      } else {
        el.style.borderColor = "";
      }
    });
    if (missing) {
      show("Please fill in the required fields (name, phone, e-mail).", false);
      return;
    }
    var email = form.elements["email"].value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.elements["email"].style.borderColor = "#b91c1c";
      show("Please enter a valid e-mail address.", false);
      return;
    }
    if (form.elements["captcha"] && form.elements["captcha"].value.trim() !== "9") {
      form.elements["captcha"].style.borderColor = "#b91c1c";
      show("Anti-spam answer is incorrect.", false);
      return;
    }

    if (SCRIPT_URL.indexOf("PASTE_") === 0) {
      show("Form storage is not configured yet. Please try again later.", false);
      return;
    }

    // --- collect data (checkbox groups joined with commas) ---
    var data = new URLSearchParams();
    var fd = new FormData(form);
    var seen = {};
    fd.forEach(function (value, key) {
      if (seen[key]) {
        data.set(key, data.get(key) + ", " + value);
      } else {
        data.set(key, value);
        seen[key] = true;
      }
    });
    data.set("page", window.location.pathname);

    // --- submit, redirect only on success ---
    btn.disabled = true;
    var original = btn.textContent;
    btn.textContent = "SUBMITTING...";
    show("Submitting your profile...", true);

    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString(),
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res.result === "success") {
          show("Profile saved. Redirecting...", true);
          window.location.href = REDIRECT_URL;
        } else {
          throw new Error((res && res.error) || "Unexpected response");
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = original;
        show("Something went wrong and your information was not saved. Please try again.", false);
      });
  });
})();
