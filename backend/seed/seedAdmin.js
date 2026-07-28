require('dotenv').config();
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

async function run() {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || 'admin@alsadiqhealthcare.online').toLowerCase();
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists for ${email}, skipping.`);
    process.exit(0);
  }

  await Admin.create({
    name: process.env.ADMIN_NAME || 'Admin',
    email,
    password: process.env.ADMIN_PASSWORD || 'change_this_password',
    role: 'superadmin',
  });

  console.log(`Admin account created for ${email}`);
  process.exit(0);
}

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
