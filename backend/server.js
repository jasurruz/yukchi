require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const pool = require("./db");

const app = express();

// ✅ 1. CORS sozlamasi (Faqat bir marta va eng tepada bo'lishi shart)
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ 2. Ma'lumotlarni o'qish uchun sozlama
app.use(express.json());

// ✅ 3. Health check (Ulanishni tekshirish uchun)
app.get("/health", async (req, res) => {
  try {
    const r = await pool.query("SELECT NOW() as now");
    res.json({ ok: true, now: r.rows[0].now });
  } catch (err) {
    console.error("DB ulanish xatosi:", err.message);
    res.status(500).json({ ok: false, message: "DB ulanmagan: " + err.message });
  }
});

// ---------------- RO‘YXATDAN O‘TISH (SIGNUP)
app.post("/signup", async (req, res) => {
  try {
    const { username, password, profileType } = req.body;

    if (!username || !password || !profileType) {
      return res.json({ status: "error", message: "Barcha maydonlarni to'ldiring!" });
    }

    const hashPass = bcrypt.hashSync(password, 10);

    await pool.query(
      "INSERT INTO users (username, password, profiletype) VALUES ($1, $2, $3)",
      [username, hashPass, profileType]
    );

    res.json({
      status: "ok",
      message: "Ro'yxatdan o'tish muvaffaqiyatli!",
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.json({
      status: "error",
      message: "Bu foydalanuvchi nomi band yoki tizimda xatolik!",
    });
  }
});

// ---------------- KIRISH (LOGIN)
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0)
      return res.json({ status: "error", message: "Foydalanuvchi topilmadi!" });

    const user = result.rows[0];

    if (!bcrypt.compareSync(password, user.password))
      return res.json({ status: "error", message: "Parol noto'g'ri!" });

    res.json({
      status: "ok",
      message: "Kirish muvaffaqiyatli!",
      username: user.username,
      profileType: user.profiletype,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ status: "error", message: "Server xatoligi" });
  }
});

// ---------------- DRIVER INFO
app.get("/getDriverInfo", async (req, res) => {
  try {
    const { username } = req.query;
    const result = await pool.query("SELECT * FROM drivers WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      return res.json({ status: "ok", karta: null, transport: null });
    }

    res.json({
      status: "ok",
      karta: result.rows[0].karta,
      transport: result.rows[0].transport,
    });
  } catch (err) {
    console.error("DriverInfo error:", err.message);
    res.json({ status: "error" });
  }
});

// ---------------- PROFILE
app.post("/getProfile", async (req, res) => {
  try {
    const { username } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (result.rows.length === 0) return res.json({ status: "error" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Profile error:", err.message);
    res.json({ status: "error" });
  }
});

// ---------------- BUYURTMA QABUL QILISH
app.post("/order", async (req, res) => {
  try {
    const { name, phone, from_city, to_city, cargo } = req.body;

    if (!name || !phone || !from_city || !to_city) {
      return res.json({ status: "error", message: "Iltimos, barcha maydonlarni to‘ldiring" });
    }

    await pool.query(
      "INSERT INTO orders (name, phone, from_city, to_city, cargo) VALUES ($1, $2, $3, $4, $5)",
      [name, phone, from_city, to_city, cargo || ""]
    );

    res.json({ status: "ok", message: "Buyurtma qabul qilindi!" });
  } catch (err) {
    console.error("Order error:", err.message);
    res.json({ status: "error", message: "Buyurtmani saqlashda xatolik" });
  }
});

// ✅ 4. Railway uchun eng muhim sozlama: PORT va HOST
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server ${PORT}-portda barqaror ishlamoqda`);
});