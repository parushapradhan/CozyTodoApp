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
      return res.render("pages/login", {
        errorMessage: "User already Exists!",
      });
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

    return res.render("pages/login", {
      errorMessage: "Verification Link sent, check Inbox!",
    });
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
      return res.render("pages/login", {
        errorMessage: "Invalid or Expired Token!",
      });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    console.log("✅ User verified:", user.username);

    res.render("pages/verifySuccess", { username: user.username });
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
      return res.render("pages/login", {
        errorMessage: "❌ Invalid Username!",
      });
    }

    if (!user.verified) {
      return res.render("pages/login", {
        errorMessage: "🚫 Please verify your email before logging in!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("pages/login", {
        errorMessage: "❌ Invalid Password!",
      });
    }

    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Something went wrong");
  }
};

// POST /forgotPassword
exports.forgotPasswordSubmit = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      // If user not found, stay on login page with error
      return res.render("pages/login", {
        errorMessage: "❌ Username not found!",
      });
    }

    // Save their user ID in session for resetting later
    req.session.resetUser = user._id;

    // Render the reset password page
    res.render("pages/resetPassword");
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).send("Server error during password reset process");
  }
};
exports.resetPasswordSubmit = async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.session.resetUser;

  if (!userId) {
    return res
      .status(400)
      .send("Session expired. Please try Forgot Password again.");
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    // Clear the session
    req.session.resetUser = null;

    res.render("pages/login", {
      errorMessage: "✅ Password successfully reset! Please log in.",
    });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).send("Failed to reset password");
  }
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
