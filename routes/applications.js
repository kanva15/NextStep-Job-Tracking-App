const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const jwt = require('jsonwebtoken');

// Middleware to check JWT
function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Get all applications for user
router.get('/', auth, async (req, res) => {
  const apps = await Application.find({ user: req.user.id });
  res.json(apps);
});

// Create new application
router.post('/', auth, async (req, res) => {
  const app = new Application({ ...req.body, user: req.user.id });
  await app.save();
  res.json(app);
});

// Update application
router.put('/:id', auth, async (req, res) => {
  const app = await Application.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(app);
});

// Delete application
router.delete('/:id', auth, async (req, res) => {
  await Application.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ msg: 'Deleted' });
});

module.exports = router;
