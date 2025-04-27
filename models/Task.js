const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['ongoing', 'done'], default: 'ongoing' },
  visible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Task', taskSchema);
