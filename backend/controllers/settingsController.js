const Settings = require('../models/Settings');

async function getSettings(req, res) {
  let settings = await Settings.findOne({ key: 'site' });
  if (!settings) {
    settings = await Settings.create({ key: 'site' });
  }
  res.json(settings);
}

async function updateSettings(req, res) {
  const settings = await Settings.findOneAndUpdate({ key: 'site' }, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  res.json(settings);
}

module.exports = { getSettings, updateSettings };
