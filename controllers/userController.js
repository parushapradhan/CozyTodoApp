const User = require("../models/User");
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
  const { username, email, password, adminCode } = req.body; // 👈 now reading adminCode too
  console.log("📥 Received signup form:", req.body);

  try {
    const existing = await User.findOne({ username });
    if (existing)
      return res.send(
        "❌ User already exists! <a href='/signup'>Try again</a>"
      );

    const token = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👇 Check adminCode against secret
    let role = "user";

    if (adminCode && adminCode === process.env.ADMIN_CODE) {
      role = "admin";
    }

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      verified: false,
      verificationToken: token,
      role, // 👈 role will be "user" or "admin"
      sound_settings: {
        cicadas: 50,
        fire: 10,
        wind: 0,
        rain: 0,
        birds: 100,
      },
      character: "wizard",
      animal: "calico",
      music_settings: {
        track: { track1: "off", track2: "on", track3: "on" },
        level: 1,
        exp: 0,
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

    await transporter.sendMail({
      from: "no-reply@cozy.com",
      to: email,
      subject: "Verify your account",
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
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
    if (!isMatch) {
      return res.send("❌ Invalid password. <a href='/login'>Try again</a>");
    }

    req.session.user = user;

    // ✅ After successful login: Redirect based on role
    if (user.role === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/");
    }
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
exports.adminPanel = async (req, res) => {
  try {
    if (req.session.user?.role !== "admin")
      return res.status(403).send("Access denied");

    const users = await User.find();
    res.render("pages/admin", { users });
  } catch (err) {
    console.error("Error loading admin panel:", err);
    res.status(500).send("Server error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.session.user?.role !== "admin")
      return res.status(403).send("Access denied");

    await User.deleteOne({ email: req.body.email });
    res.redirect("/admin");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Could not delete user");
  }
};

exports.removeTask = async (req, res) => {
  const { email, task } = req.body;

  try {
    if (req.session.user?.role !== "admin")
      return res.status(403).send("Access denied");

    await User.updateOne(
      { email },
      { $pull: { "music_settings.tasks": { task_name: task } } }
    );
    res.redirect("/admin");
  } catch (err) {
    console.error("Remove task error:", err);
    res.status(500).send("Failed to remove task");
  }
};
exports.updateLevel = async (req, res) => {
  const { email, level } = req.body;

  try {
    if (req.session.user?.role !== "admin")
      return res.status(403).send("Access denied");

    console.log("Trying to update level for:", email, "to level:", level);

    const result = await User.updateOne(
      { email },
      { $set: { level: parseInt(level, 10) } }
    );

    console.log("MongoDB Update Result:", result);

    if (result.modifiedCount === 0) {
      console.warn("⚠️ No user updated — maybe wrong email?");
    }

    res.redirect("/admin");
  } catch (err) {
    console.error("Update level error:", err);
    res.status(500).send("Failed to update level");
  }
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
