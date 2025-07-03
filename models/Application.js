const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  company: String,
  position: String,
  status: { type: String, enum: ['Applied', 'Interviewing', 'Offer', 'Rejected'], default: 'Applied' },
  appliedDate: { type: Date, default: Date.now },
  notes: String
});

module.exports = mongoose.model('Application', ApplicationSchema);
