const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
// const PORT = 3000;

// 🔗 MongoDB (currently unused but connected)
//mongoose
//.connect(
//`mongodb+srv://parushapradhan78:${process.env.DB_password}@cluster0webdev.ot1x2pr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0webdev`,
// {
// useNewUrlParser: true,
// useUnifiedTopology: true,
//}
// )
// .then(() => console.log("✅ MongoDB connected"))
//.catch((err) => console.error("❌ MongoDB error:", err));

// 📁 Path to users.json
const usersPath = path.join(__dirname, "data", "users.json");

// 🛠 Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// 🌐 Routes
app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/signup", (req, res) => {
  res.render("pages/signup");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.get("/forgotPassword", (req, res) => {
  res.render("pages/forgotPassword");
});

// 📝 Signup - Save to JSON
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  let users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.send("❌ User already exists! <a href='/signup'>Try again</a>");
  }

  users.push({
    username,
    email,
    password,
    level: 1,
    xp: 0,
    tasks: [],
    selectedTracks: [],
  });

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.redirect("/");
});

// 🔐 Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.send("❌ Invalid credentials. <a href='/login'>Try again</a>");
  }

  res.redirect("/");
});

// 🔐 Forgot Password
app.post("/forgotPassword", (req, res) => {
  console.log("✅ Forgot password form submitted:", req.body);
  res.redirect("/login");
});

// 🧑‍💼 ADMIN PANEL
app.get("/admin", (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
  res.render("pages/admin", { users });
});

app.post("/admin/delete-user", (req, res) => {
  const { email } = req.body;
  let users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
  users = users.filter((u) => u.email !== email);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.redirect("/admin");
});

app.post("/admin/remove-task", (req, res) => {
  const { email, task } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
  const user = users.find((u) => u.email === email);
  if (user) {
    user.tasks = user.tasks.filter((t) => t !== task);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  }
  res.redirect("/admin");
});

app.post("/admin/update-level", (req, res) => {
  const { email, level } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
  const user = users.find((u) => u.email === email);
  if (user) {
    user.level = parseInt(level);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  }
  res.redirect("/admin");
});
app.post("/update-playlist", (req, res) => {
  const { email, selectedTracks } = req.body;

  let users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

  users = users.map((user) => {
    if (user.email === email) {
      user.selectedTracks = Array.isArray(selectedTracks)
        ? selectedTracks
        : [selectedTracks];
    }
    return user;
  });

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.redirect("/"); // or stay on same page
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
