document.addEventListener("DOMContentLoaded", function () {

  const navbarHTML = `
  <nav class="navbar navbar-expand-lg topbar">
    <div class="container-fluid px-4">

      <a class="navbar-brand d-flex align-items-center gap-2" href="truck.html">
        <img src="logistik.png" class="brand-logo" />
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNav">

        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
          <li class="nav-item"><a class="nav-link" href="truck.html">Bosh sahifa</a></li>
          <li class="nav-item"><a class="nav-link" href="yukolish.html">Yuk-olish</a></li>
          <li class="nav-item"><a class="nav-link" href="yukberish.html">Yuk-berish</a></li>
          <li class="nav-item"><a class="nav-link" href="filiallar.html">Filiallar</a></li>
          <li class="nav-item"><a class="nav-link" href="aloqa.html">Aloqa</a></li>
          <li class="nav-item"><a class="nav-link" href="xarita.html">Xarita</a></li>
        </ul>

        <div class="d-flex align-items-center gap-2">
          <a href="kirish1.html" class="btn btn-sm btn-outline-light auth-link">Kirish</a>
          <button class="btn btn-sm btn-primary profile-btn">Profile</button>
        </div>

      </div>
    </div>
  </nav>
  `;

  const mount = document.getElementById("navbar-mount");
  if (mount) {
    mount.innerHTML = navbarHTML;
  }

});