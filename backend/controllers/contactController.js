const validator = require('validator');
const ContactMessage = require('../models/ContactMessage');

async function create(req, res) {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }
  const doc = await ContactMessage.create({ name, email, phone, subject, message });
  res.status(201).json({ message: 'Thank you, we will get back to you soon.', id: doc._id });
}

async function listAdmin(req, res) {
  const { status } = req.query;
  const query = status ? { status } : {};
  const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
  res.json(messages);
}

async function updateStatus(req, res) {
  const { status } = req.body;
  const doc = await ContactMessage.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!doc) return res.status(404).json({ message: 'Message not found' });
  res.json(doc);
}

async function remove(req, res) {
  const doc = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Message not found' });
  res.json({ message: 'Message deleted' });
}

module.exports = { create, listAdmin, updateStatus, remove };
