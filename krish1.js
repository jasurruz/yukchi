// Serveringizning internetdagi manzili
const API_URL = "https://yukchi-production.up.railway.app";

// ===============================
//         RO'YXATDAN O'TISH
// ===============================
const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
        const profileType = document.getElementById("regProfileType").value;

        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, profileType })
            });

            const data = await res.json();

            if (data.status === "ok") {
                alert("Ro'yxatdan o'tish muvaffaqiyatli!");
                localStorage.setItem("profileType", profileType);
                localStorage.setItem("username", username);
                showLogin();
            } else {
                alert(data.message || "Xatolik!");  
            }
        } catch (err) {
            console.error(err);
            alert("Server bilan aloqa uzildi! (Signup)");
        }
    });
}

// ===============================
//               KIRISH
// ===============================
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.status === "ok") {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("username", username);
                localStorage.setItem("profileType", data.profileType); // Bazadan kelgan rol

                // Profilga o'tish
                window.location.href = "truck.html";
            } else {
                alert(data.message || "Login yoki parol noto'g'ri!");
            }
        } catch (err) {
            console.error(err);
            alert("Server bilan aloqa uzildi! (Login)");
        }
    });
}

// ===============================
//      KO‘RINISHLARNI ALMASHTIRISH
// ===============================
const showLoginBtn = document.getElementById("show-login");
const showSignupBtn = document.getElementById("show-signup");

if (showLoginBtn) showLoginBtn.addEventListener("click", showLogin);
if (showSignupBtn) showSignupBtn.addEventListener("click", showSignup);

function showLogin() {
    if(document.getElementById("signup-container")) document.getElementById("signup-container").style.display = "none";
    if(document.getElementById("login-container")) document.getElementById("login-container").style.display = "block";
}

function showSignup() {
    if(document.getElementById("signup-container")) document.getElementById("signup-container").style.display = "block";
    if(document.getElementById("login-container")) document.getElementById("login-container").style.display = "none";
}

// ===============================
//    NAVIGATSIYA (ROLLAR BO'YICHA)
// ===============================
document.addEventListener("DOMContentLoaded", function() {
    const profileType = localStorage.getItem("profileType"); 
    const loggedIn = localStorage.getItem("loggedIn");

    const yukOlishLink = document.getElementById("nav-yuk-olish");
    const yukBerishLink = document.getElementById("nav-yuk-berish");

    // Agar tizimga kirmagan bo'lsa, maxsus menyularni yashiramiz
    if (!loggedIn) {
        if (yukOlishLink) yukOlishLink.style.display = "none";
        if (yukBerishLink) yukBerishLink.style.display = "none";
    } 
    else {
        if (profileType === "Haydovchi") {
            if (yukBerishLink) yukBerishLink.style.display = "none";
            if (yukOlishLink) yukOlishLink.style.display = "inline-block";
        } 
        else if (profileType === "Foydalanuvchi") {
            if (yukOlishLink) yukOlishLink.style.display = "none";
            if (yukBerishLink) yukBerishLink.style.display = "inline-block";
        }
    }
}); 