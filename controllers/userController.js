const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const usersPath = path.join(__dirname, "../data/users.json");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// GET /
exports.index = (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("pages/index", { user: req.session.user });
};

exports.signupForm = (req, res) => res.render("pages/signup");
exports.loginForm = (req, res) => res.render("pages/login");
exports.forgotPasswordForm = (req, res) => res.render("pages/forgotPassword");

// POST /signup
exports.signupUser = async (req, res) => {
  const { username, email, password } = req.body; // ← Add email here
  console.log("📥 Received signup form:", req.body);

  try {
    const existing = await User.findOne({ username });
    console.log(await User.findOne({ username }));
    if (existing)
      return res.send(
        "❌ User already exists! <a href='/signup'>Try again</a>"
      );
    const token = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      isVerified: false, // NEW
      verificationToken: token, // NEW
      sound_settings: {
        cicadas: 50,
        fire: 10,
        wind: 0,
        rain: 0,
        birds: 100,
      },
      character: "wizard",
      animal: "dozy",
      level: 1,
      exp: 0,
      music_settings: {
        track: { track1: "off", track2: "on", track3: "on" },
        tasks: [],
      },
      settings: {
        location: "bedroom",
        time_format: "24hrs",
      },
    });

    await newUser.save();
    const verificationLink = `http://localhost:8080/verify-email?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: parseInt(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
    await transporter
      .sendMail({
        from: "no-reply@cozy.com",
        to: email,
        subject: "Verify your account",
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
      })
      .then((info) => {
        console.log("✅ Email sent:", info);
      })
      .catch((err) => {
        console.error("❌ Email failed:", err);
      });

    res.send("📨 A verification email has been sent. Please check your inbox.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.verifyUser = async (req, res) => {
  const { token } = req.query; // 👈 NOT req.params
  console.log("🔎 Received token:", token);

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.send("❌ Invalid or expired verification link.");
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    console.log("✅ User verified:", user.username);

    res.send(
      "✅ Your account has been verified! You can now <a href='/login'>login</a>."
    );
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).send("Something went wrong during verification.");
  }
};

// POST /login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.send("❌ Invalid User ID. <a href='/login'>Try again</a>");
    }
    if (!user.verified) {
      return res.send(
        "🚫 Please verify your email before logging in. <a href='/login'>Back to login</a>"
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid password!");
    req.session.user = user;
    res.redirect("/");
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

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Error destroying session:", err);
      return res.status(500).send("Could not log out");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};

// ADMIN
exports.adminPanel = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersPath));
  res.render("pages/admin", { users });
};

exports.deleteUser = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersPath));
  const updated = users.filter((u) => u.email !== req.body.email);
  fs.writeFileSync(usersPath, JSON.stringify(updated, null, 2));
  res.redirect("/admin");
};

exports.removeTask = (req, res) => {
  const { email, task } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find((u) => u.email === email);
  if (user) {
    user.tasks = user.tasks.filter((t) => t !== task);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  }
  res.redirect("/admin");
};

exports.updateLevel = (req, res) => {
  const { email, level } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find((u) => u.email === email);
  if (user) {
    user.level = parseInt(level);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  }
  res.redirect("/admin");
};

exports.updateSettings = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const updatedFields = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.session.user._id },
      { $set: updatedFields },
      { new: true }
    );
    req.session.user = updatedUser;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.resetDetailsForm = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const flash = req.session.flash;
  delete req.session.flash;

  res.render("pages/resetDetails", { flash });
};

exports.resetDetailsSubmit = async (req, res) => {
  const { username, email, newPassword } = req.body;

  if (!req.session.user) {
    return res.redirect("/login");
  }

  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      req.session.flash = { type: "error", message: "User not found." };
      return res.redirect("/resetDetails");
    }

    const updateFields = {};

    // Check if username is changed and unique
    if (username && username !== currentUser.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        req.session.flash = {
          type: "error",
          message: "Username already taken.",
        };
        return res.redirect("/resetDetails");
      }
      updateFields.username = username;
    } else if (username && username === currentUser.username) {
      req.session.flash = {
        type: "error",
        message: "New username must be different from old username.",
      };
      return res.redirect("/resetDetails");
    }

    // Check if new password is different
    if (newPassword) {
      const isSamePassword = await bcrypt.compare(
        newPassword,
        currentUser.password
      );
      if (isSamePassword) {
        req.session.flash = {
          type: "error",
          message: "New password must be different from old password.",
        };
        return res.redirect("/resetDetails");
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateFields.password = hashedPassword;
    }

    if (email && email.trim() !== "") {
      // Validate email format only if user entered something
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        req.session.flash = {
          type: "error",
          message: "Please enter a valid email address!",
        };
        return res.redirect("/resetDetails");
      }
      updateFields.email = email;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.session.user._id,
      { $set: updateFields },
      { new: true }
    );

    req.session.user = updatedUser;
    req.session.flash = {
      type: "success",
      message: "✅ Details updated successfully!",
    };
    res.redirect("/resetDetails");
  } catch (err) {
    console.error("Reset details error:", err);
    req.session.flash = { type: "error", message: "Something went wrong!" };
    res.redirect("/resetDetails");
  }
};
