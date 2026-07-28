const express = require('express');
const { protect } = require('../middleware/auth');
const { create, listAdmin, updateStatus, remove } = require('../controllers/contactController');

const router = express.Router();

router.post('/', create);
router.get('/', protect, listAdmin);
router.put('/:id/status', protect, updateStatus);
router.delete('/:id', protect, remove);

module.exports = router;
