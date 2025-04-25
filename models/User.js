const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  sound_settings: {
    cicadas: Number,
    fire: Number,
    wind: Number,
    rain: Number,
    birds: Number,
  },
  character: String,
  animal: String,
  music_settings: {
    track: {
      track1: String,
      track2: String,
      track3: String,
    },
  },
  level: Number,
  exp: Number,
  tasks: Array,
  settings: {
    location: String,
    time_format: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
