// Serveringizning internetdagi manzili
const API_URL = "https://yukchi-uz-production.up.railway.app";

// ===============================
//         RO'YXATDAN O'TISH
// ===============================
document.getElementById("signup-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const profileType = document.getElementById("regProfileType").value;

    try {
        // Manzil oxiriga /signup qo'shildi
        const res = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
                profileType
            })
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
    } catch (error) {
        console.error("Xato:", error);
        alert("Server bilan aloqa uzildi!");
    }
});


// ===============================
//               KIRISH
// ===============================
document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        // Manzil oxiriga /login qo'shildi
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.status === "ok") {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", username);

            if (data.profileType) {
                localStorage.setItem("profileType", data.profileType);
            }

            // Profilga o'tish
            window.location.href = "truck.html";
        } else {
            alert(data.message || "Login yoki parol noto'g'ri!");
        }
    } catch (error) {
        console.error("Xato:", error);
        alert("Serverga ulanishda xatolik yuz berdi!");
    }
});

// ===============================
//      KO‘RINISHLARNI ALMASHTIRISH
// ===============================
document.getElementById("show-login")?.addEventListener("click", showLogin);
document.getElementById("show-signup")?.addEventListener("click", showSignup);

function showLogin() {
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
}

function showSignup() {
    document.getElementById("signup-container").style.display = "block";
    document.getElementById("login-container").style.display = "none";
}