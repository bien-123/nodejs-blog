const express = require('express');
const router = express.Router();

// Nhận lại đối tượng khởi tạo từ file CourseController
const courseController = require('../app/controllers/CourseController');

// courseController.index
router.get('/create', courseController.create);
router.post('/store', courseController.store);

router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);

router.delete('/:id', courseController.destroy);

// DELETE SOFT
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.forceDestroy);

router.get('/:slug', courseController.show);

module.exports = router;
