const express = require('express');
const { protect } = require('../middleware/auth');
const { makeUploader } = require('../middleware/upload');
const { listPublic, getOnePublic, listAdmin, create, update, remove } = require('../controllers/teamController');

const router = express.Router();
const upload = makeUploader('team');

router.get('/', listPublic);
router.get('/admin/all', protect, listAdmin);
router.get('/:id', getOnePublic);
router.post('/', protect, upload.single('photo'), create);
router.put('/:id', protect, upload.single('photo'), update);
router.delete('/:id', protect, remove);

module.exports = router;
