const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const usersPath = path.join(__dirname, '../data/users.json');

// GET /
exports.index = (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('pages/index', { user: req.session.user });
};

exports.signupForm = (req, res) => res.render('pages/signup');
exports.loginForm = (req, res) => res.render('pages/login');
exports.forgotPasswordForm = (req, res) => res.render('pages/forgotPassword');

// POST /signup
exports.signupUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    console.log(await User.findOne({ username }))
    if (existing) return res.send("❌ User already exists! <a href='/signup'>Try again</a>");

    const newUser = new User({
      username,
      password,
      sound_settings: {
        cicadas: 50, fire: 10, wind: 0, rain: 0, birds: 100
      },
      character: "wizard",
      animal: "calico",
      music_settings: {
        track: { track1: "off", track2: "on", track3: "on" },
        level: 1, exp: 0, tasks: []
      },
      settings: {
        location: "bedroom",
        time_format: "24hrs"
      }
    });

    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

// POST /login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.send("❌ Invalid credentials. <a href='/login'>Try again</a>");
    }
    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Something went wrong");
  }
};

// POST /forgotPassword
exports.forgotPasswordSubmit = (req, res) => {
  console.log("✅ Forgot password form submitted:", req.body);
  res.redirect("/login");
};

// ADMIN
exports.adminPanel = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersPath));
  res.render("pages/admin", { users });
};

exports.deleteUser = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersPath));
  const updated = users.filter(u => u.email !== req.body.email);
  fs.writeFileSync(usersPath, JSON.stringify(updated, null, 2));
  res.redirect("/admin");
};

exports.removeTask = (req, res) => {
  const { email, task } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find(u => u.email === email);
  if (user) {
    user.tasks = user.tasks.filter(t => t !== task);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  }
  res.redirect("/admin");
};

exports.updateLevel = (req, res) => {
  const { email, level } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find(u => u.email === email);
  if (user) {
    user.level = parseInt(level);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  }
  res.redirect("/admin");
};

exports.updateSettings = (req, res) => {
  console.log("📝 Settings update received:", req.body);
  res.json({ success: true });
};
