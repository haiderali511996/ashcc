const express = require('express');
const { protect } = require('../middleware/auth');
const Blog = require('../models/Blog');
const TeamMember = require('../models/TeamMember');
const ContactMessage = require('../models/ContactMessage');
const Appointment = require('../models/Appointment');

const router = express.Router();

router.get('/stats', protect, async (req, res) => {
  const [totalBlogs, publishedBlogs, totalTeam, newMessages, pendingAppointments, totalAppointments] =
    await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      TeamMember.countDocuments({ isActive: true }),
      ContactMessage.countDocuments({ status: 'new' }),
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments(),
    ]);
  res.json({ totalBlogs, publishedBlogs, totalTeam, newMessages, pendingAppointments, totalAppointments });
});

module.exports = router;
