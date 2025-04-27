const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, "data", "users.json");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require('./routes/taskRoutes');
require("dotenv").config();

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use("/", userRoutes);
app.use('/', taskRoutes);
// Connect to MongoDB (even though we're not using it yet)

mongoose
  .connect(`${process.env.DB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

// let user = {
//   // "_id": {
//   //   "$oid": "67f8791968f64a134799872d"
//   // },
//   // "user_id": "user_001",
//   "sound_settings": {
//     "cicadas": 50,
//     "fire": 10,
//     "wind": 0,
//     "rain": 0,
//     "birds": 100
//   },
//   "character": "wizard",
//   "animal": "calico",
//   "music_settings": {
//     "track": {
//       "track1": "off",
//       "track2": "on",
//       "track3": "on"
//     },
//     "level": 1,
//     "exp": 0,
//     "tasks": [
//       // {
//       //   "task_name": "sdfsdfsdF",
//       //   "status": "completed",
//       //   "visible": true
//       // }
//     ]
//   },
//   "settings": {
//     "location": "bedroom",
//     "time_format": "24hrs"
//   }
// }

app.use(express.urlencoded({ extended: true }));

app
  .listen(8080, () => {
    console.log("🚀 Server is running at http://localhost:8080");
  })
  .on("error", (err) => {
    console.error("❌ Server failed to start:", err);
  });
