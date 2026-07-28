const Appointment = require('../models/Appointment');

async function create(req, res) {
  const { patientName, phone, preferredDate } = req.body;
  if (!patientName || !phone || !preferredDate) {
    return res.status(400).json({ message: 'Patient name, phone and preferred date are required' });
  }
  const appointment = await Appointment.create(req.body);
  res.status(201).json({ message: 'Appointment request received. We will contact you shortly.', appointment });
}

async function listAdmin(req, res) {
  const { status } = req.query;
  const query = status ? { status } : {};
  const appointments = await Appointment.find(query).sort({ preferredDate: 1, createdAt: -1 });
  res.json(appointments);
}

async function updateStatus(req, res) {
  const { status } = req.body;
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
  res.json(appointment);
}

async function remove(req, res) {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
  res.json({ message: 'Appointment deleted' });
}

module.exports = { create, listAdmin, updateStatus, remove };
