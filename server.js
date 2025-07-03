// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (modern, no deprecated options needed)
mongoose.connect('mongodb+srv://kanvatrivedi:MImgkYpMMh0Fck4t@cluster0.2whxn7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error", err));

// Job model
const JobSchema = new mongoose.Schema({
  company: String,
  position: String,
  notes: String,
  status: String
});
const Job = mongoose.model('Job', JobSchema);

// Routes
app.get('/api/applications', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: "Failed to save job" });
  }
});

app.put('/api/applications/:id', async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/api/applications/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
