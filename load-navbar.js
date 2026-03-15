document.addEventListener("DOMContentLoaded", function () {
  const mount = document.getElementById("navbar-mount");
  if (!mount) return;

  const navbarHTML = `
  <nav class="navbar navbar-expand-lg topbar">
    <div class="container-fluid px-4">

      <a class="navbar-brand d-flex align-items-center gap-2" href="truck.html">
        <img src="logistik.png" alt="Yukchi.uz Logo" class="brand-logo" />
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
        aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
          <li class="nav-item"><a class="nav-link" href="truck.html">Bosh sahifa</a></li>
          <li class="nav-item"><a class="nav-link" href="yukolish.html">Yuk-olish</a></li>
          <li class="nav-item"><a class="nav-link" href="yukberish.html">Yuk-berish</a></li>
          <li class="nav-item"><a class="nav-link" href="filiallar.html">Filiallar</a></li>
          <li class="nav-item"><a class="nav-link" href="aloqa.html">Aloqa</a></li>
          <li class="nav-item"><a class="nav-link" href="xarita.html">Xarita</a></li>
        </ul>

        <div class="d-flex align-items-center gap-2">
          <select class="lang-select form-select form-select-sm" id="langSelect" aria-label="Til tanlash">
            <option value="uz">O'zbek</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
          <a href="kirish1.html" class="auth-link" id="authLink">Kirish</a>
          <button type="button" class="profile-btn" id="profileBtn">Profile</button>
        </div>
      </div>
    </div>
  </nav>
  `;

  mount.innerHTML = navbarHTML;

  // ===== Active menu link =====
  const current = location.pathname.split("/").pop() || "truck.html";
  document.querySelectorAll(".topbar .nav-link").forEach((a) => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  // ===== Til saqlash =====
  const langSelect = document.getElementById("langSelect");
  const savedLang = localStorage.getItem("siteLang");
  if (savedLang && langSelect) langSelect.value = savedLang;
  if (langSelect) {
    langSelect.addEventListener("change", () => {
      localStorage.setItem("siteLang", langSelect.value);
    });
  }

  // ===== Kirish / Chiqish =====
  const authLink = document.getElementById("authLink");
  let loggedIn = false;
  try { loggedIn = localStorage.getItem("loggedIn") === "true"; } catch (e) {}

  if (authLink) {
    if (loggedIn) {
      authLink.textContent = "Chiqish";
      authLink.href = "#";
      authLink.addEventListener("click", (e) => {
        e.preventDefault();
        try {
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("username");
        } catch (err) {}
        window.location.href = "truck.html";
      });
    } else {
      authLink.textContent = "Kirish";
      authLink.href = "kirish1.html";
    }
  }

  // ===== Profile tugmasi =====
  const profileBtn = document.getElementById("profileBtn");
  if (profileBtn) {
    profileBtn.addEventListener("click", () => {
      const ok = localStorage.getItem("loggedIn") === "true";
      if (!ok) {
        alert("Profilga o'tish uchun avval tizimga kiring!");
        window.location.href = "kirish1.html";
      } else {
        window.location.href = "profile.html";
      }
    });
  }
});