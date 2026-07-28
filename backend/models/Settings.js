const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'site' },
    siteName: { type: String, default: 'Al Sadiq Health Care Centre' },
    tagline: { type: String, default: 'Compassionate Care, Trusted Excellence' },
    aboutText: { type: String, default: '' },
    mission: { type: String, default: '' },
    vision: { type: String, default: '' },
    address: { type: String, default: 'Lahore, Pakistan' },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    email: { type: String, default: '' },
    mapEmbedUrl: { type: String, default: '' },
    openingHours: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
