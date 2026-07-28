const TeamMember = require('../models/TeamMember');

async function listPublic(req, res) {
  const members = await TeamMember.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
  res.json(members);
}

async function listAdmin(req, res) {
  const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
  res.json(members);
}

async function create(req, res) {
  const payload = { ...req.body };
  if (req.file) payload.photo = `/uploads/team/${req.file.filename}`;
  const member = await TeamMember.create(payload);
  res.status(201).json(member);
}

async function update(req, res) {
  const payload = { ...req.body };
  if (req.file) payload.photo = `/uploads/team/${req.file.filename}`;
  const member = await TeamMember.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  if (!member) return res.status(404).json({ message: 'Team member not found' });
  res.json(member);
}

async function remove(req, res) {
  const member = await TeamMember.findByIdAndDelete(req.params.id);
  if (!member) return res.status(404).json({ message: 'Team member not found' });
  res.json({ message: 'Team member deleted' });
}

module.exports = { listPublic, listAdmin, create, update, remove };
