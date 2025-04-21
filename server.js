const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, "data", "users.json");


require("dotenv").config();

const app = express();
const PORT = 8080;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(session({
  secret: `${process.env.SECRET_KEY}`, // Change this to a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // use true if using HTTPS
}));

// Connect to MongoDB (even though we're not using it yet)

mongoose
.connect(
`${process.env.DB_URI}`,
{
useNewUrlParser: true,
useUnifiedTopology: true,
}
)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error(err));


let user = {
  "_id": {
    "$oid": "67f8791968f64a134799872d"
  },
  "user_id": "user_001",
  "sound_settings": {
    "cicadas": 50,
    "fire": 10,
    "wind": 0,
    "rain": 0,
    "birds": 100
  },
  "character": "wizard",
  "animal": "calico",
  "music_settings": {
    "track": {
      "track1": "off",
      "track2": "on",
      "track3": "on"
    },
    "level": 2,
    "exp": 2000,
    "tasks": [
      {
        "task_name": "sdfsdfsdF",
        "status": "completed",
        "visible": true
      }
    ]
  },
  "settings": {
    "location": "room1",
    "time_format": "24hrs"
  }
}
// Routes
app.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("pages/index", { user: req.session.user });
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

// Simulated form post handlers
// SIGNUP: Save to users.json
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  // const usersPath = path.join(__dirname, "data", "users.json");
  const users = JSON.parse(fs.readFileSync(usersPath));

  // Check for duplicate email
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.send("❌ User already exists! <a href='/signup'>Try again</a>");
  }

  users.push({ username, email, password }); // no hash for now
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.redirect("/");
});

// LOGIN: Match email and password
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // const usersPath = path.join(__dirname, "data", "users.json");
  const users = JSON.parse(fs.readFileSync(usersPath));

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.send("❌ Invalid credentials. <a href='/login'>Try again</a>");
  }
  req.session.user = user;
  res.redirect("/"); // redirect to main game page
});

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
  const email = req.body.email;
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


app.post('/updateUserSettings', (req, res) => {
  // if (!req.session.user) {
  //   return res.status(401).json({ error: 'User not logged in' });
  // }

  // const sessionEmail = req.session.user.email; // or use user_id if that's your unique key
  // const updatedData = req.body;

  // let users = JSON.parse(fs.readFileSync(usersPath));
  // const index = users.findIndex(u => u.email === sessionEmail);

  // if (index !== -1) {
  //   // Only update allowed fields
  //   users[index] = { ...users[index], ...updatedData };

  //   fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  //   req.session.user = users[index]; // Update session with latest user info
  //   res.json({ success: true });
  // } else {
  //   res.status(404).json({ error: 'User not found' });
  // }
  console.log("User settings updated:", req.body);
});




app.use(express.urlencoded({ extended: true }));

app
  .listen(8080, () => {
    console.log("🚀 Server is running at http://localhost:8080");
  })
  .on("error", (err) => {
    console.error("❌ Server failed to start:", err);
  });
