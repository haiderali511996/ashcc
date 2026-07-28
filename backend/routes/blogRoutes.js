const express = require('express');
const { protect } = require('../middleware/auth');
const { makeUploader } = require('../middleware/upload');
const {
  listPublic,
  getBySlug,
  listAdmin,
  getOneAdmin,
  create,
  update,
  remove,
} = require('../controllers/blogController');

const router = express.Router();
const upload = makeUploader('blogs');

router.get('/', listPublic);
router.get('/admin/all', protect, listAdmin);
router.get('/admin/:id', protect, getOneAdmin);
router.get('/:slug', getBySlug);
router.post('/', protect, upload.single('coverImage'), create);
router.put('/:id', protect, upload.single('coverImage'), update);
router.delete('/:id', protect, remove);

module.exports = router;
